import * as React from 'react';

function loadFeatureApp(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');

    // Get MF container
    const container = window[scope];

    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);

    // Get shared module
    const factory = await window[scope].get(module);

    // Initialize the module
    const Module = factory();
    return Module;
  };
}

const useDynamicFeature = ({ src }) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!src) {
      return;
    }

    const element = document.createElement('script');

    element.src = src;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Feature App Imported: ${src}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Feature App Loading Error: ${src}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Feature App Removed: ${src}`);
      document.head.removeChild(element);
    };
  }, [src]);

  return {
    ready,
    failed,
  };
};

function Loader({ src, lib, mod, ...rest }) {
  const { ready, failed } = useDynamicFeature({ src });

  if (!ready) {
    return process.env.NODE_ENV === 'development' ? (
      <h2>Loading feature: {src}</h2>
    ) : null;
  }

  if (failed) {
    return process.env.NODE_ENV === 'development' ? (
      <h2>Failed to load feature: {src}</h2>
    ) : null;
  }

  const Component = React.lazy(loadFeatureApp(lib, mod));

  return (
    <React.Suspense fallback="Loading the app...">
      <Component {...rest} />
    </React.Suspense>
  );
}

export default Loader;
