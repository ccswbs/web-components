# uofg-alert

This component acts an alert dialog and is used to inform users of something. For example, The University of Guelph Home Page uses it to display campus wide alerts from UofG Alert. Typically this component is used in a uofg-modal component but is not required to be.

## Usage

```html
<uofg-alert>
  <span slot="title">YOUR TITLE HERE</span>
  <span slot="subtitle">YOUR SUBTITLE HERE</span>
  <span slot="message">YOUR ALERT MESSAGE HERE</span>
  <span slot="footer">YOUR FOOTER CONTENT HERE</span>
</uofg-alert>
```

If you are using it within a uofg-modal then:

```html
<uofg-modal label="Alert Modal" static-backdrop alert-dialog auto-open>
  <uofg-alert>
    <span slot="title">YOUR TITLE HERE</span>
    <span slot="subtitle">YOUR SUBTITLE HERE</span>
    <span slot="message">YOUR ALERT MESSAGE HERE</span>
    <span slot="footer">YOUR FOOTER CONTENT HERE</span>
  </uofg-alert>
</uofg-modal>
```

<!-- Auto Generated Below -->
