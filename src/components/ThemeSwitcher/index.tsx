import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';

const ThemeSwitcher = () => {
  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: 'Light',
    },
    {
      key: 'dark',
      label: 'Dark',
    },
  ];

  const handleThemeSwitch: MenuProps['onClick'] = ({ key }) => {
    localStorage.setItem('theme', key);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleThemeSwitch }}
      placement="bottomLeft"
    >
      <Button>Select Theme</Button>
    </Dropdown>
  );
};

export default ThemeSwitcher;
