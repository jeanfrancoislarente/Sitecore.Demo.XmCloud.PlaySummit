import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PromoIcon: ImageField;
  // DEMO TEAM CUSTOMIZATION - Additional field
  PromoIcon2: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
  // DEMO TEAM CUSTOMIZATION - Additional field
  PromoText3: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            {/* DEMO TEAM CUSTOMIZATION - Add fields */}
            <div className="field-promotext3">
              <Text className="promo-text" field={props.fields.PromoText3} />
            </div>
            <div className="field-promotext">
              <Text className="promo-text" field={props.fields.PromoText} />
            </div>
            <div className="field-promotext2">
              <Text className="promo-text" field={props.fields.PromoText2} />
            </div>
            {/* END CUSTOMIZATION */}
            <div className="field-promolink">
              {/* DEMO TEAM CUSTOMIZATION - Custom button classes */}
              <JssLink field={props.fields.PromoLink} className="btn--main btn--main--round" />
              {/* END CUSTOMIZATION */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="promo-text" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promotext">
              <Text className="promo-text" field={props.fields.PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

// DEMO TEAM CUSTOMIZATION - New variant
export const WithColumns = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo promo-columns ${props.params.styles}`}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div className="text-cols">
              <div className="field-promotext">
                <JssImage field={props.fields.PromoIcon2} />
                <JssRichText className="rich-text" field={props.fields.PromoText} />
              </div>
              <div className="field-promotext2">
                <JssImage field={props.fields.PromoIcon2} />
                <JssRichText className="rich-text" field={props.fields.PromoText2} />
              </div>
              <div className="field-promotext3">
                <JssImage field={props.fields.PromoIcon2} />
                <JssRichText className="rich-text" field={props.fields.PromoText3} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} className="btn--main btn--main--round" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
// END CUSTOMIZATION
