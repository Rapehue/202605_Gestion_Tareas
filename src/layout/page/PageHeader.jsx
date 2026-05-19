import { Flex } from '../';

const PageHeader = ({
  title,
  subtitle,
  actions
}) => {

  return (
    <Flex
      justify="space-between"
      align="flex-start"
    >

      <div>

        <h1 className="page-title">
          {title}
        </h1>

        {subtitle && (
          <p className="page-subtitle">
            {subtitle}
          </p>
        )}

      </div>

      {actions && (
        <div>
          {actions}
        </div>
      )}

    </Flex>
  );
};

export default PageHeader;