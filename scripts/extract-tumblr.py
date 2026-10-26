"""Archive media from the owner's public Tumblr portfolio.

Run manually with network access. The output manifest records the exact source URL
for every locally preserved file; the two music-sharing posts are excluded.
"""

from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "archive"
EXCLUDED = {"732609244897132544", "732590687848185856"}
DESIGN_SYSTEM_MEDIA = [
    "b73d788fe1053d3086c26a3bcee26c50/tumblr_inline_s4mhuo96ym1s8t4cj_500.png",
    "630de488f9b9bc63e7360b4508b899b8/tumblr_inline_sdgss8v9jv1s8t4cj_500.gif",
    "1daeece3f8cc631835c5fa1098986e0c/tumblr_inline_s4mlhe6oxS1s8t4cj_500.png",
    "7b9af34fa324d2138421d74a504da98c/tumblr_inline_sdfy9s8NhG1s8t4cj_500.png",
    "9bda089a692ed84a10c9242f5b82e9eb/tumblr_inline_sdfycenDEr1s8t4cj_500.png",
    "8e8015b9a3e9008d10308a728851ad90/tumblr_inline_sdfyfqY4zF1s8t4cj_500.png",
    "18a0db807c3da8009c8e1d50665e242c/tumblr_inline_sdfyzkkVjC1s8t4cj_500.png",
    "4b70b5f0e46db0b0f337a4289e3c7bde/tumblr_inline_sdfz0be64H1s8t4cj_500.png",
    "858df984de2f77bacd68d529de86ef7b/tumblr_inline_sdfzb6iwmu1s8t4cj_500.png",
    "6310ac16669a1a65428a62141c2880bb/tumblr_inline_sdfzpkuGN51s8t4cj_500.gif",
    "6ac2218a1418cbd8e55d2d3b4fea7c45/tumblr_inline_sdgrul80nV1s8t4cj_500.gif",
]


class MediaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.media = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag in {"img", "source", "video"}:
            url = values.get("src") or (values.get("poster") if tag == "video" else None)
            if url and url.startswith("https://"):
                self.media.append(url)


def fetch(url):
    return urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read()


def download(url, target):
    if target.exists() and target.stat().st_size:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(fetch(url))


def main():
    rss = ET.fromstring(fetch("https://seeyourmaker.tumblr.com/rss"))
    manifest = []
    for item in rss.findall("./channel/item"):
        link = item.findtext("link", "")
        post_id = link.rstrip("/").split("/")[-1]
        if post_id in EXCLUDED:
            continue
        title = item.findtext("title", "").strip()
        body = item.findtext("description", "")
        parser = MediaParser()
        parser.feed(body)
        urls = list(dict.fromkeys(parser.media))
        if post_id == "739065128727838720":
            urls.extend("https://64.media.tumblr.com/" + path for path in DESIGN_SYSTEM_MEDIA)
        files = []
        for index, url in enumerate(urls, 1):
            original_url = url
            if "_500." in url and not url.endswith(".gifv"):
                url = url.replace("_500.", "_1280.")
            clean = url.split("?")[0]
            ext = Path(clean).suffix.lower() or ".bin"
            if ext == ".gifv":
                ext = ".gif"  # Tumblr serves GIF bytes under a .gifv URL.
            if ext not in {".png", ".jpg", ".jpeg", ".gif", ".gifv", ".mp4", ".webp"}:
                continue
            target = OUT / post_id / f"{index:02d}{ext}"
            try:
                try:
                    download(url, target)
                except Exception:
                    url = original_url
                    download(url, target)
                files.append({"path": "/" + str(target.relative_to(ROOT / "public")), "source": url, "bytes": target.stat().st_size})
            except Exception as exc:
                print("FAILED", post_id, url, exc)
        manifest.append({"postId": post_id, "title": title, "source": link, "files": files})
        print(post_id, title or "(untitled)", len(files), "files")
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
