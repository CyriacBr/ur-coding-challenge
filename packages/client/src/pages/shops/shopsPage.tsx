import React from "react";
import styled from "styled-components";
import { IShop } from "common";
import { ShopItem } from "../../shared/components/shopItem";
import { SelectPicker } from "rsuite";
import { ItemDataType } from "rsuite/lib/@types/common";

const s = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 3em;
  `,
  ToolBar: styled.div`
    display: flex;
    margin-bottom: 2em;
  `,
  Items: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.span`
    .picker {
      width: 224px;
    }

    .rs-picker-toggle-placeholder {
      font-size: 1.3em;
    }

    .rs-picker-toggle-clean {
      display: none;
    }
  `,
  SubTitle: styled.span`
    font-size: 0.8em;
    opacity: 0.7;
    padding: 0px 0px 12px 12px;
  `,
  SelectValue: styled.span`
    font-weight: normal;
    line-height: 1.42857143;
    color: #272c36;
    font-size: 1.3em;
  `
};

interface TypeData {
  label: string;
  value: "all" | "nearby" | "preferred";
}

const typeData: TypeData[] = [
  {
    label: "All Shops",
    value: "all"
  },
  {
    label: "Nearby Shops",
    value: "nearby"
  },
  {
    label: "Preferred Shops",
    value: "preferred"
  }
];

interface NearbyShopsPageProps {}

const ShopsPage: React.FC<NearbyShopsPageProps> = () => {
  const items: IShop[] = [
    {
      id: 1,
      location: { id: 1, latitude: 0, longitude: 0 },
      name: "McDonald"
    }
  ];
  return (
    <s.Container>
      <s.ToolBar>
        <s.Info>
          <s.Title>
            <SelectPicker
              data={typeData}
              size="lg"
              appearance="subtle"
              className="picker"
              defaultValue="all"
              searchable={false}
              renderValue={(value, item) => <s.SelectValue>{(item as ItemDataType).label}</s.SelectValue>}
            />
          </s.Title>
          <s.SubTitle>14 items</s.SubTitle>
        </s.Info>
      </s.ToolBar>
      <s.Items>
        {items.map(i => (
          <ShopItem item={i} />
        ))}
      </s.Items>
    </s.Container>
  );
};

export { ShopsPage as NearbyShopsPage };
