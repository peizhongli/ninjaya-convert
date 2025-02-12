export const generateReactTS = (componentName: string) => `
import styles from "./index.module.less";

const ${componentName} = (props) => {
  return (
    <div>
      
    </div>
  );
};

export default ${componentName};

`;
export const generateReactJS = (componentName: string) => `
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
