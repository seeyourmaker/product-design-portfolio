import './CatalogThumbnails.css';

export function CatalogThumbnailColumn(){
  return <div className="catalog-thumbnail-column">
    <div className="catalog-idea-inset"><div className="catalog-thumbnail catalog-thumbnail--idea">
      <h4>Not everyone is a<br/><em>Prompt Engineer.</em></h4>
      <span className="catalog-thumbnail-note">Designed for everyone</span>
    </div></div>
    <div className="catalog-thumbnail catalog-thumbnail--value">
      <h4>Get value for <s>money</s> <em>Tokens</em></h4>
      <div className="catalog-response" aria-label="Service publication response preview">
        <span className="catalog-response-time">10:10 AM</span>
        <div className="catalog-response-bubble">
          <p>Your new service is now <strong>published!</strong> 🥳</p>
          <p>You can now:</p>
          <ul><li>Checkout how the service request form looks</li><li>Edit any section in service</li></ul>
          <span className="catalog-response-limit">3 of 30 <img src="/catalog-curator/color-indicator.svg" alt=""/></span>
        </div>
        <div className="catalog-feedback" aria-hidden="true">
          <img src="/catalog-curator/confirmed.svg" alt=""/><img src="/catalog-curator/negated.svg" alt=""/><span className="catalog-feedback-divider"/><img src="/catalog-curator/copy.svg" alt=""/><img src="/catalog-curator/send.svg" alt=""/>
        </div>
      </div>
    </div>
  </div>;
}

export function CatalogInteractionThumbnail(){
  return <div className="catalog-thumbnail catalog-thumbnail--interaction">
    <h4><em>Clicks</em> say more<br/>than words</h4>
    <span className="catalog-thumbnail-note">Temporary thumbnail</span>
  </div>;
}
