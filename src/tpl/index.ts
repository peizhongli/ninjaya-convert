export const generateReactJS = (componentName: string) => `
import React, { useEffect, useState } from 'react';
import styles from "./index.module.less";

const ${componentName} = (props) => {
  return (
    <div>
      
    </div>
  );
};

export default ${componentName};

`;
export const generateReactTS = (componentName: string) => `
import React, { useEffect, useState } from 'react';
import styles from "./index.module.less";

interface ${componentName}Props {

}

const ${componentName} = (props: ${componentName}Props) => {
  return (
    <div>
      
    </div>
  );
};

export default ${componentName};

`;
