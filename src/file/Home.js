import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../base";
import { Link } from "react-router-dom";

const Home = () => {
  const [getData, setGetData] = useState([]);

  const fetchData = async () => {
    const readData = await collection(db, "dataBox");
    onSnapshot(readData, (snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setGetData(r);
    });
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "dataBox", id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          {getData?.map((props) => (
            <Card key={props.id}>
              <Image src={props.image} />
              <Display>
                <Name>{props.name}</Name>
                <Name>{props.message}</Name>
              </Display>
              <But>
                <Button
                  onClick={() => {
                    deleteData(props.id);
                  }}
                >
                  Delete
                </Button>

                <Nav to={`/${props.id}`}>Enter</Nav>
              </But>
            </Card>
          ))}
        </Wrapper>
      </Container>
    </div>
  );
};

export default Home;

const But = styled.div`
  display: flex;
`;

const Nav = styled(Link)`
  text-decoration: none;
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Button = styled.div`
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Card = styled.div`
  margin: 20px;
  width: 300px;
  background: white;
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
const Name = styled.div``;

const Display = styled.div``;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  background: orange;
  margin-top: -30px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: 100%;
  background-color: lightgray;
`;
