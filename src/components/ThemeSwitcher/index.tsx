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
    console.log(key);
    localStorage.setItem('theme', key);
    if (key === 'light') {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
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
