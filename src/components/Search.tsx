import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

export default function Search( props: { setSearchText: (s: string) => void}) {
  const { setSearchText } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }

  return (
    <Input
      allowClear={true}
      size="large"
      placeholder="Character Search"
      prefix={<SearchOutlined />}
      onChange={handleOnChange}
    />
  );
}