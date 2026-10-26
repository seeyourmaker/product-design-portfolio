"""Archive owner-uploaded visuals from the public Gamma stories linked by Tumblr."""

from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
import json

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://cdn.gamma.app/"
ACCOUNT = "qksi4pjnkqzw5i5/"
STORIES = {
    "smart-watch-strap": {
        "source": "https://gamma.app/public/Smart-Watch-with-LED-strap-jqswzh3376c6p3v",
        "assets": """
8fb7732a6b274801be48f329b1e14b61/optimized/download.png
d7a1e0a43ce74f9d914c253731d71d73/optimized/grid_1.png
f7731130895045b1bdeb0baa996ae36d/optimized/symbaba_a_foldable_oled_touch_screen_as_a_strap_for_touch_scree_286e48e7-a33a-4d1b-8784-184fb66812f2.png
2cce470a11f445d9a1b2b739f4663421/optimized/symbaba_futuristic_strap_design_which_has_a_touch_screen_featur_3e67105c-95da-4201-9e94-7b9c74f85ff5.png
efc12e83612745898e58a7b11ff7d40a/optimized/Untitled_Artwork-4.jpg
c476b90e0f2643008492bf3ffd642401/optimized/symbaba_futuristic_strap_design_which_has_a_touch_screen_featur_3e67105c-95da-4201-9e94-7b9c74f85ff5.png
77585d98f804458f94371adca1c0f643/optimized/IA---Basic.png
ea8a37b40599446a91e07ce544b96ccb/original/Watch-Wire-Frame-12.png
3902f80a298840dda251facd6bf16c3e/optimized/Watch-Wire-Frame-11.png
7c1045366175462db18b533aa546e0c7/optimized/Watch-Wire-Frame-1.png
3dd3cb9e9e3e48da872585b681896181/optimized/Watch-Wire-Frame-2.png
3131cf2c9e324d5ca0f59e679527e702/optimized/Watch-Wire-Frame-3.png
5740fb123cae4e5db3e1877640706b21/optimized/Watch-Wire-Frame-5.png
b71f0c809ec34e1ba9b76b8668a92212/optimized/Watch-Wire-Frame-6.png
7c9d096b87c5471fb47c504923954e45/original/Watch-Wire-Frame-7.png
87f265a88f6b486b9a0d2a0b303ba627/original/Watch-Wire-Frame-8.png
a849be8104b5487cb8b580a3d571f871/optimized/Watch-Wire-Frame-9.png
b7bab249ede245e0b72c71ec611b917c/optimized/Watch-Wire-Frame-10.png
b1c951a7729849e7abc7187769cbf15a/optimized/HF---1.png
5e4dbc9ac5f64f86a9b94ff96ce3eb79/optimized/HF---5.png
8feddf7e92de4820bbfeeff23320baa4/optimized/HF---6.png
9195354b2aa5462690bdb5d77f20197e/optimized/HF---9.png
22c02f5f8a9c4ce8842abdea1ece2660/optimized/HF---11.png
93484c70ff9d42459219154016c0c7c0/optimized/HF-Music---1.png
45c8a79989314878ab12b0877ec9fe58/optimized/HF-Music---2.png
ee42b0a8adf64569a869fdb1c072fdd1/optimized/HF-Music---3.png
46316c9d1bbc42d4a71d533790c3aba3/optimized/HF-Music---5.png
1caa5919a7c446dc9dffde53e0aed966/optimized/HF-Music---6.png
d98c0bef662f45e8a1791e45d2a749f4/optimized/HF-Music---7.png
""",
    },
    "city-buddy": {
        "source": "https://gamma.app/public/City-Buddy-kg0sz6eck3izjrx",
        "assets": """
99710e9018ba4dfb964b035ad1beed7f/optimized/Cover.png
1d4029b7498e4f65b9445aa439bc289c/optimized/Problem-solving-pana.png
9a64f4fd49004ed68d229bcb5dce5d07/optimized/Screenshot-2023-03-06-at-2.28.30-PM.png
c7ebb7a2bc724ea897e6cb36cd560c37/optimized/Screenshot-2023-03-06-at-2.29.06-PM.png
e937e745eee54b37a3249efbcad737ae/optimized/chart-scatter-bubble.svg
ab9cd0fb48314b3aa882a486319372e5/optimized/chart-tree-map.svg
66647910c3454843b305a9773a45f87c/optimized/magnifying-glass-chart.svg
9b614346d8634fc2ac9b67f4729441dd/optimized/arrows-spin.svg
569b3e6284eb466cb4b525c6e8592aa0/optimized/DP3---User-Journey-Map.jpg
""",
    },
    "accessible-mobile-cover": {
        "source": "https://gamma.app/public/Accessible-Design-for-Special-Needs-3orbw1e2aah77hg",
        "assets": """
5c38a96d04cb4df6b74cf78153db0c03/optimized/a3e8f0c2_c395_457e_bce4_0d5ac51b236c.webp
493710c31898413884c9d68e49f65a42/optimized/user-tie-hair.svg
c009446e41d449dda8fab07e6f42f0c0/optimized/bullseye-arrow.svg
82a7d314d9a94a60b7ad0ec486fee278/optimized/timeline-arrow.svg
e0976b3ae0464435886fcc9ea2d999d2/optimized/briefcase.svg
a227bb11320c4b97b3c492d0dc49fe57/optimized/UM-test.png
de81a5f2b56e4ada85c927faef75d2f5/optimized/Flowchart.jpg
921eb8c26e6b48aca60e95c18d2f281a/optimized/grid_0.png
50f19d457bde40afbc6aaad04b79b48d/optimized/grid_0.png
6d65280f7cb34ed7a0f8a6be18a8fe91/optimized/Frame-105.png
4462b0a998f44dfb889045763d282fc8/optimized/1.png
372a7675f0074a4dbf5b8ec501c9f53d/optimized/2.png
3a327d36c123496081390a092c4a1ea5/optimized/3.png
e6873c2d4d27414abbe028eae2577404/optimized/1.png
f809cfeced6a40e2a5570142944553fa/optimized/2.png
04e7baa4085b4c8d8d79342167cffb1d/optimized/2---1.png
7fbd64d0507e4d1dae660a85d3350d01/optimized/3---2.png
e0bfed326ff24b0e9a6773f202390507/optimized/3---3.png
02d045a3805546f68825932d62b0f187/optimized/3---4.png
0a368e78b47d449bab52242e81b88b64/optimized/3---5.png
875eac72ed184ad0a06641d1dc37a6e2/optimized/Final-Product.png
""",
    },
}


def get_asset(item):
    index, url, out = item
    target = out / f"{index:02d}{Path(url).suffix}"
    try:
        if not target.exists():
            target.write_bytes(urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())
        return {"path": "/" + str(target.relative_to(ROOT / "public")), "source": url, "bytes": target.stat().st_size, "name": Path(url).name}
    except Exception as exc:
        return {"source": url, "error": str(exc)}


def main():
    for slug, story in STORIES.items():
        out = ROOT / "public" / "archive" / slug
        out.mkdir(parents=True, exist_ok=True)
        paths = story["assets"].split()
        urls = [BASE + ("zc87vhr30n8uf3n/" if slug == "smart-watch-strap" and i == 0 else ACCOUNT) + path for i, path in enumerate(paths)]
        with ThreadPoolExecutor(max_workers=8) as pool:
            files = list(pool.map(get_asset, ((i, url, out) for i, url in enumerate(urls, 1))))
        (out / "manifest.json").write_text(json.dumps({"source": story["source"], "files": files}, indent=2) + "\n")
        print(slug, sum("path" in file for file in files), "/", len(files))


if __name__ == "__main__":
    main()
