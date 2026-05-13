import '@shopify/ui-extensions/preact';
import { render } from 'preact';

export default () => {
  render(<Extension />, document.body);
};

function Extension() {
  const accountNumberMetafield = shopify.appMetafields.value.find(
    (m) =>
      m.target.type === 'cart' &&
      m.metafield.namespace === '$app' &&
      m.metafield.key === 'accountNumber'
  );

  const customerCodeMetafield = shopify.appMetafields.value.find(
    (m) =>
      m.target.type === 'cart' &&
      m.metafield.namespace === '$app' &&
      m.metafield.key === 'customerCode'
  );

  async function onAccountNumberChange(value) {
    await shopify.applyMetafieldChange({
      type: 'updateCartMetafield',
      metafield: {
        namespace: '$app',
        key: 'accountNumber',
        type: 'single_line_text_field',
        value,
      },
    });
  }

  async function onCustomerCodeChange(value) {
    await shopify.applyMetafieldChange({
      type: 'updateCartMetafield',
      metafield: {
        namespace: '$app',
        key: 'customerCode',
        type: 'single_line_text_field',
        value,
      },
    });
  }

  return (
    <s-stack gap="base">
      <s-banner heading="Customer Information">
        <s-text>
          Please enter your account number and customer code.
        </s-text>
      </s-banner>

      <s-text-field
        label="Account Number"
        value={accountNumberMetafield?.metafield?.value || ''}
        onChange={onAccountNumberChange}
      />

      <s-text-field
        label="Customer Code"
        value={customerCodeMetafield?.metafield?.value || ''}
        onChange={onCustomerCodeChange}
      />
    </s-stack>
  );
}