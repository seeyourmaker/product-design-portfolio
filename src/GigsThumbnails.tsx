import './GigsThumbnails.css';

export function GigsThumbnailColumn(){
  return <div className="gigs-thumbnail-column">
    <div className="gigs-thumb gigs-thumb--scene" role="img" aria-label="Local Gigs poster celebrating independent artists and small Bengaluru venues">
      <div className="gigs-thumb-top"><span>✳ LOCAL GIGS</span><span>ISSUE 001 / YOUR CITY</span></div>
      <div className="gigs-scene-type">SMALL<br/>ROOMS<span>.</span><br/><em>BIG</em> NIGHTS.</div>
      <div className="gigs-scene-orbit" aria-hidden="true"><i/><i/><i/></div>
      <div className="gigs-thumb-foot"><span>HOMEBREWED SOUNDS<br/>BENGALURU, INDIA</span><span>LIVE / LOCAL / LOUD ↗</span></div>
    </div>
    <div className="gigs-thumb gigs-thumb--artists" role="img" aria-label="Artist-first ticketing concept with direct UPI booking and no booking fee in the current demo">
      <div className="gigs-thumb-top"><span>02 / THE IDEA</span><span>ARTISTS FIRST ✳</span></div>
      <div className="gigs-artists-heading">MORE<br/>MUSIC.<br/><em>LESS<br/>MIDDLE.</em></div>
      <div className="gigs-ticket"><span>LOCAL GIGS / TICKET 001</span><strong>DIRECT BOOKING<br/>FEWER PLATFORM CUTS</strong><span>THE AIM: LESS COMMISSION<br/>CURRENT DEMO: NO BOOKING FEE ↗</span></div>
      <div className="gigs-artists-note">A closer route from the crowd to the stage.</div>
    </div>
  </div>;
}

export function GigsFeatureThumbnail(){
  return <div className="gigs-thumb gigs-thumb--feature" role="img" aria-label="Local Gigs mobile event discovery concept, supporting the homegrown music scene with a fictional Afterglow show">
    <div className="gigs-feature-top"><span>✳ LOCAL GIGS</span><span>INDEPENDENT MUSIC / TICKETING</span></div>
    <div className="gigs-feature-heading">SUPPORT THE<br/><em>SCENE.</em><br/>FEEL THE<br/>MUSIC.</div>
    <div className="gigs-feature-caption">HOMEGROWN SHOWS.<br/>THE ROOMS THAT MAKE A CITY.</div>
    <div className="gigs-feature-star" aria-hidden="true"><span>*</span></div>
    <div className="gigs-feature-phone" aria-hidden="true">
      <div className="gigs-feature-phone-top"><span>✳ LOCAL GIGS</span><span>⌕</span></div>
      <div className="gigs-feature-phone-kicker">TONIGHT SOUNDS DIFFERENT</div>
      <div className="gigs-feature-poster"><span>LOCAL GIGS PRESENTS / VOL. 014</span><strong>AFTER<br/>GLOW</strong><div className="gigs-poster-rings"><div className="gigs-poster-rings-inner"><i/><i/><i/></div></div><small>SAT 14 NOV · BENGALURU</small></div>
      <div className="gigs-feature-event"><span>SMALL ROOM / BIG NIGHT</span><strong>Afterglow</strong><small>The Paper Room · Bengaluru</small></div>
      <div className="gigs-feature-cta">EXPLORE THE NIGHT <span>↗</span></div>
    </div>
    <div className="gigs-feature-bottom"><span>BUILT FOR THE SCENE</span><span>01 / 03 ↗</span></div>
  </div>;
}
