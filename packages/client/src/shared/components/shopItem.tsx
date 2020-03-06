import React from "react";
import styled from "styled-components";
import { IShop, locationDistance } from "common";
import { Icon, IconButton, ButtonToolbar, Whisper, Tooltip } from "rsuite";
import { useStoreState } from "../../store";

const s = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 20px 0 rgba(218, 224, 235, 0.6);
    background: rgb(251, 252, 253);
    border-radius: 7px;
    position: absolute;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5em 1em 1em 1em;
  `,
  Image: styled.img`
    width: 300px;
    height: 250px;
    border-radius: 7px 7px 0 0;
    background: #eee;
  `,
  ImageOverlay: styled.div`
    position: absolute;
    z-index: 5;
    width: 300px;
    height: 250px;
    border-radius: 7px 7px 0 0;
    /* background: #eee; */
    /* background-image: radial-gradient(#00000020, #00000070); */
  `,
  Title: styled.span`
    font-size: 1.3em;
  `,
  Details: styled.div`
    display: flex;
    margin-top: 0.5em;
    opacity: 0.7;

    > :first-child {
      font-size: 1.3em;
      color: #1787e8;
      margin-right: 0.5em;
    }
  `,
  Buttons: styled.div`
    display: flex;
    justify-content: flex-end;

    > :first-child {
      margin-right: 0.5em;
    }

    .thumbs-down {
      /* color: #ea584d; */
    }

    .thumbs-up {
    }
  `,
  Ribbon: styled.div`
    display: none;
    position: absolute;
    z-index: 6;
    top: 0;
    left: 1.5em;
    padding: 0.5em;
    border-radius: 0px 0px 4px 4px;
    background: rgb(251, 252, 253);
    box-shadow: 0 8px 20px 0 rgba(218, 224, 235, 0.6);
    padding: 1em 0.5em 1em 0.5em;
    .star {
      font-size: 2em;
      color: #f5c31d;
      box-shadow: 0 8px 20px 0 rgba(218, 224, 235, 0.6);
    }
  `
};

interface ShopItemProps {
  item: IShop;
  toggleLike: (item: IShop, isLiked: boolean) => void;
  onDislike: (item: IShop) => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ item, toggleLike, onDislike }) => {
  const userData = useStoreState(state => state.auth.userData);
  const { location } = userData;

  const distanceDisplay = () => {
    return `${locationDistance(
      location.latitude,
      location.longitude,
      item.location.latitude,
      item.location.longitude
    )}Km away`;
  };

  const isLiked = () => {
    return true;
  };

  return (
    <s.Container>
      <s.Image src="https://picsum.photos/300/250" />
      {/* <s.ImageOverlay /> */}
      <s.Ribbon>
        <Icon icon="star" className="star" />
      </s.Ribbon>
      <s.Content>
        <s.Title>MyItem</s.Title>
        <s.Details>
          <Icon icon="map-marker" />
          {distanceDisplay()}
        </s.Details>
        <s.Buttons>
          <ButtonToolbar>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={
                <Tooltip>
                  {isLiked()
                    ? "Remove from preferred shops"
                    : "Add to preferred shops"}
                </Tooltip>
              }
            >
              <IconButton
                className="thumbs-up"
                style={{ color: isLiked() ? "#f5c31d" : "unset" }}
                icon={<Icon icon="star" />}
                circle
                size="md"
                onClick={() => toggleLike(item, isLiked())}
              />
            </Whisper>
            <IconButton
              className="thumbs-down"
              icon={<Icon icon="thumbs-down" />}
              size="md"
              onClick={() => onDislike(item)}
            >
              Dislike
            </IconButton>
          </ButtonToolbar>
        </s.Buttons>
      </s.Content>
    </s.Container>
  );
};

export { ShopItem };
