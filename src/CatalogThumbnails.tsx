import './CatalogThumbnails.css';

const asset = (name: string) => `/catalog-curator/${name}.svg`;

function FeedbackIcons(){
  return <div className="catalog-feedback" aria-hidden="true">
    <img src={asset('confirmed')} alt=""/>
    <img src={asset('negated')} alt=""/>
    <span className="catalog-feedback-divider"/>
    <img src={asset('copy')} alt=""/>
    <img src={asset('send')} alt=""/>
  </div>;
}

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
          <span className="catalog-response-limit">3 of 30 <img src={asset('color-indicator')} alt=""/></span>
        </div>
        <FeedbackIcons/>
      </div>
    </div>
  </div>;
}

export function CatalogInteractionThumbnail({showHeading=true}:{showHeading?:boolean}){
  return <div className="catalog-thumbnail catalog-thumbnail--interaction">
    <div className="catalog-demo-layout">
      <div className="catalog-demo-chat">
        {showHeading&&<h4><em>Clicks</em> say more<br/>than words</h4>}
        <span className="catalog-demo-time">11:08 AM</span>
        <div className="catalog-demo-bubble">
          <p>Let’s assign a workflow for your service</p>
          <div className="catalog-demo-choice"><img src={asset('radio-unselected')} alt=""/><span>HR Payroll Workflow (AI recommended)</span></div>
          <div className="catalog-demo-choice catalog-demo-choice--existing">
            <img src={asset('radio-selected')} alt=""/>
            <div className="catalog-demo-select">Choose from the list<img src={asset('icon-down')} alt=""/></div>
          </div>
          <span className="catalog-demo-submit">Submit</span>
          <span className="catalog-demo-limit">3 of 30 <img src={asset('color-indicator')} alt=""/></span>
        </div>
        <FeedbackIcons/>
      </div>
      <div className="catalog-demo-components">
        <h5>Get components in chat</h5>
        <div className="catalog-demo-option catalog-demo-option--radio"><img src={asset('radio-component-selected')} alt=""/>Radio Buttons</div>
        <div className="catalog-demo-option"><span className="catalog-demo-checkbox"/>Checkboxes</div>
        <div className="catalog-demo-menu">
          <div className="catalog-demo-menu-toggle">Curated Lists<img src={asset('icon-down')} alt=""/></div>
          <div className="catalog-demo-menu-panel">
            <div className="catalog-demo-menu-search"><img src={asset('search-icon')} alt=""/><span>Search Capability</span></div>
            <div className="catalog-demo-menu-options"><span>Get</span><span>Everything</span><span>Faster</span></div>
          </div>
        </div>
        <div className="catalog-demo-shortcuts"><h5>Chat with shortcuts</h5>
          <p># Gets you to edit specific sections</p>
          <p>@ Gets you users to tag or assign</p>
          <p>/ Invokes skills and add-ons</p>
        </div>
      </div>
    </div>
  </div>;
}
