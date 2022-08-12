import React, { useEffect, useState } from "react";
import * as Styled from "./home.styled";
import { Requests } from "../../services/axios/requests";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";

export const Home = () => {
  const [flows, setFlows] = useState([]);
  const history = useHistory();

  const getFlows = () => {
    new Requests().getMyFlows().then((r) => {
      setFlows(r);
    });
  };

  useEffect(() => {
    getFlows();
  }, []);

  const handleClick = (e, flow) => {
    if (e.target.id === "close") {
      new Requests().deleteFlowById(flow._id).then(() => {
        getFlows();
      });
    } else {
      history.push(`/dash/flow/${flow._id}`);
    }
  };

  const handleDelete = (e, flow) => {
    console.log("cheguei");
    e.preventDefault();
    console.log(flow, e);
    // history.push(`/dash/flow/${flow._id}`);
  };

  const emojiGenerator = () => {
    const emojis = ["🎉", "🎊", "✨", "🥰", "😃", "🍀", "😊", "🙌🏻"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Styled.NameTitle>Ínicio</Styled.NameTitle>
        <Styled.HelloBox>
          <p style={{ fontSize: 16, marginLeft: 10, paddingTop: 10 }}>
            Bem vindo ao mflow {emojiGenerator()}
            {emojiGenerator()}
          </p>
        </Styled.HelloBox>
        <Styled.ContainerData>
          {flows.map((f) => {
            return (
              <Styled.ItemBox
                id={"box"}
                key={f.id}
                onClick={(e) => handleClick(e, f)}
              >
                <Styled.DeleteButton id={"close"}>
                  <Styled.IconItem id={"close"}>close</Styled.IconItem>
                </Styled.DeleteButton>
                <Styled.ItemName id={"box"}>{f.name}</Styled.ItemName>
                <Styled.ItemDescription id={"box"}>
                  {f.description}
                </Styled.ItemDescription>
              </Styled.ItemBox>
            );
          })}
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};
