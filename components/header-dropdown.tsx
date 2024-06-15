import Colors from '@/constants/Colors'
import { Text, View } from 'react-native'
import * as DropDownMenu from 'zeego/dropdown-menu'

type Props = {
  title: string
  onSelect(key: string): void
  items: Array<{ key: string; title: string; icon: string }>
  selected?: string
}

export function HeaderDropdown({ items, onSelect, title, selected }: Props) {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: 'inter-medium' }}>
            {title}
          </Text>

          {selected && (
            <Text
              style={{
                marginLeft: 10,
                color: Colors.greyLight,
                fontSize: 14,
                fontFamily: 'inter-medium',
              }}
            >
              {selected} &gt;
            </Text>
          )}
        </View>
      </DropDownMenu.Trigger>

      <DropDownMenu.Content style={{ backgroundColor: 'red' }}>
        {items.map((item) => (
          <DropDownMenu.Item
            key={item.key}
            onSelect={() => onSelect(item.key)}
            style={{ height: 10 }}
            // selected={item.key === selected}
          >
            <DropDownMenu.ItemTitle>{item.title}</DropDownMenu.ItemTitle>
            <DropDownMenu.ItemIcon
              ios={{ name: item.icon, pointSize: 16 }}
              // androidIconName="flag"
            />
          </DropDownMenu.Item>
        ))}
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  )
}
