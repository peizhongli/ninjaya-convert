export const generateReactJS = (componentName: string) => `
import React, { useEffect, useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from "./index.module.less";

const ${componentName} = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    
  }));

  return (
    <div>
      
    </div>
  );
});

${componentName}.displayName = "${componentName}";

export default ${componentName};

`;
export const generateReactTS = (componentName: string) => `
import React, { useEffect, useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from "./index.module.less";

interface ${componentName}Props {

}

const ${componentName} = forwardRef((props: ${componentName}Props, ref) => {

  useImperativeHandle(ref, () => ({
    
  }));

  return (
    <div>
      
    </div>
  );
});

${componentName}.displayName = "${componentName}";

export default ${componentName};

`;
