const componentsList = [
  { name: 'Accordion', fileName: 'accordion' },
  { name: 'AutoComplete', fileName: 'autocomplete' },
  { name: 'Avatar', fileName: 'avatar' },
  { name: 'AvatarGroup', fileName: 'avatargroup' },
  { name: 'Badge', fileName: 'badge' },
  { name: 'BlockUI', fileName: 'blockui' },
  { name: 'BreadCrumb', fileName: 'breadcrumb' },
  { name: 'Button', fileName: 'button' },
  { name: 'Calendar', fileName: 'calendar' },
  { name: 'Card', fileName: 'card' },
  { name: 'Carousel', fileName: 'carousel' },
  { name: 'CascadeSelect', fileName: 'cascadeselect' },
  { name: 'Chart', fileName: 'chart' },
  { name: 'Checkbox', fileName: 'checkbox' },
  { name: 'Chip', fileName: 'chip' },
  { name: 'Chips', fileName: 'chips' },
  { name: 'ColorPicker', fileName: 'colorpicker' },
  { name: 'Column', fileName: 'column' },
  { name: 'ColumnGroup', fileName: 'columngroup' },
  { name: 'ConfirmDialog', fileName: 'confirmdialog' },
  { name: 'ConfirmPopup', fileName: 'confirmpopup' },
  { name: 'ContextMenu', fileName: 'contextmenu' },
  { name: 'Csstransition', fileName: 'csstransition' },
  { name: 'DataScroller', fileName: 'datascroller' },
  { name: 'DataTable', fileName: 'datatable' },
  { name: 'DataView', fileName: 'dataview' },
  { name: 'DeferredContent', fileName: 'deferredcontent' },
  { name: 'Dialog', fileName: 'dialog' },
  { name: 'Divider', fileName: 'divider' },
  { name: 'Dock', fileName: 'dock' },
  { name: 'Dropdown', fileName: 'dropdown' },
  { name: 'Editor', fileName: 'editor' },
  { name: 'Fieldset', fileName: 'fieldset' },
  { name: 'FileUpload', fileName: 'fileupload' },
  { name: 'Galleria', fileName: 'galleria' },
  { name: 'Image', fileName: 'image' },
  { name: 'Inplace', fileName: 'inplace' },
  { name: 'InputMask', fileName: 'inputmask' },
  { name: 'InputNumber', fileName: 'inputnumber' },
  { name: 'InputSwitch', fileName: 'inputswitch' },
  { name: 'InputText', fileName: 'inputtext' },
  { name: 'InputTextarea', fileName: 'inputtextarea' },
  { name: 'KeyFilter', fileName: 'keyfilter' },
  { name: 'Knob', fileName: 'knob' },
  { name: 'ListBox', fileName: 'listbox' },
  { name: 'MegaMenu', fileName: 'megamenu' },
  { name: 'Mention', fileName: 'mention' },
  { name: 'Menu', fileName: 'menu' },
  { name: 'Menubar', fileName: 'menubar' },
  { name: 'MenuItem', fileName: 'menuitem' },
  { name: 'Message', fileName: 'message' },
  { name: 'Messages', fileName: 'messages' },
  { name: 'MultiSelect', fileName: 'multiselect' },
  { name: 'MultiStateCheckbox', fileName: 'multistatecheckbox' },
  { name: 'OrderList', fileName: 'orderlist' },
  { name: 'OrganizationChart', fileName: 'organizationchart' },
  { name: 'OverlayPanel', fileName: 'overlaypanel' },
  { name: 'OverlayService', fileName: 'overlayservice' },
  { name: 'Paginator', fileName: 'paginator' },
  { name: 'Panel', fileName: 'panel' },
  { name: 'PanelMenu', fileName: 'panelmenu' },
  { name: 'Password', fileName: 'password' },
  { name: 'PickList', fileName: 'picklist' },
  { name: 'Portal', fileName: 'portal' },
  { name: 'Progressbar', fileName: 'progressbar' },
  { name: 'ProgressSpinner', fileName: 'progressspinner' },
  { name: 'RadioButton', fileName: 'radiobutton' },
  { name: 'Rating', fileName: 'rating' },
  { name: 'Ripple', fileName: 'ripple' },
  { name: 'Row', fileName: 'row' },
  { name: 'ScrollPanel', fileName: 'scrollpanel' },
  { name: 'ScrollTop', fileName: 'scrolltop' },
  { name: 'SelectButton', fileName: 'selectbutton' },
  { name: 'SelectItem', fileName: 'selectitem' },
  { name: 'Sidebar', fileName: 'sidebar' },
  { name: 'Skeleton', fileName: 'skeleton' },
  { name: 'SlideMenu', fileName: 'slidemenu' },
  { name: 'Slider', fileName: 'slider' },
  { name: 'SpeedDial', fileName: 'speeddial' },
  { name: 'SplitButton', fileName: 'splitbutton' },
  { name: 'Splitter', fileName: 'splitter' },
  { name: 'Steps', fileName: 'steps' },
  { name: 'StyleClass', fileName: 'styleclass' },
  { name: 'TabMenu', fileName: 'tabmenu' },
  { name: 'TabView', fileName: 'tabview' },
  { name: 'Tag', fileName: 'tag' },
  { name: 'Terminal', fileName: 'terminal' },
  { name: 'TerminalService', fileName: 'terminalservice' },
  { name: 'TieredMenu', fileName: 'tieredmenu' },
  { name: 'Timeline', fileName: 'timeline' },
  { name: 'Toast', fileName: 'toast' },
  { name: 'ToggleButton', fileName: 'togglebutton' },
  { name: 'Toolbar', fileName: 'toolbar' },
  { name: 'Tooltip', fileName: 'tooltip' },
  { name: 'Tree', fileName: 'tree' },
  { name: 'TreeNode', fileName: 'treenode' },
  { name: 'TreeSelect', fileName: 'treeselect' },
  { name: 'TreeTable', fileName: 'treetable' },
  { name: 'TriStateCheckbox', fileName: 'tristatecheckbox' },
  { name: 'VirtualScroller', fileName: 'virtualscroller' },
];

const hooksList = [
  // Lifecycle
  {
    name: 'useMountEffect',
    fileName: 'hooks',
  },
  {
    name: 'useUpdateEffect',
    fileName: 'hooks',
  },
  {
    name: 'useUnmountEffect',
    fileName: 'hooks',
  },

  // Listener
  {
    name: 'useEventListener',
    fileName: 'hooks',
  },
  {
    name: 'useOverlayListener',
    fileName: 'hooks',
  },
  {
    name: 'useOverlayScrollListener',
    fileName: 'hooks',
  },
  {
    name: 'useResizeListener',
    fileName: 'hooks',
  },
  // Element
  {
    name: 'useClickOutside',
    fileName: 'hooks',
  },
  {
    name: 'useIntersectionObserver',
    fileName: 'hooks',
  },
  {
    name: 'useMouse',
    fileName: 'hooks',
  },
  {
    name: 'useMove',
    fileName: 'hooks',
  },
  // Timer
  {
    name: 'useInterval',
    fileName: 'hooks',
  },
  {
    name: 'useTimeout',
    fileName: 'hooks',
  },
  // state
  {
    name: 'useCounter',
    fileName: 'hooks',
  },
  {
    name: 'useDebounce',
    fileName: 'hooks',
  },
  {
    name: 'useFavicon',
    fileName: 'hooks',
  },
  {
    name: 'usePrevious',
    fileName: 'hooks',
  },
  {
    name: 'useStorage',
    fileName: 'hooks',
  },
];

const apiList = [
  {
    name: 'PrimeReactProvider',
    fileName: 'api',
  },
  {
    name: 'locale',
    fileName: 'api',
  },
  {
    name: 'addLocale',
    fileName: 'api',
  },
  {
    name: 'updateLocaleOption',
    fileName: 'api',
  },
  {
    name: 'updateLocaleOptions',
    fileName: 'api',
  },
  {
    name: 'localeOption',
    fileName: 'api',
  },
  {
    name: 'localeOptions',
    fileName: 'api',
  },
];

export const searchList = [...componentsList, ...hooksList, ...apiList];

export const documentSelectors = [
  { scheme: 'file', language: 'typescriptreact' },
  { scheme: 'file', language: 'typescript' },
  { scheme: 'file', language: 'javascript' },
];
