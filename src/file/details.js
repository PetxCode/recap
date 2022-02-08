import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db, auth, storage } from "../base";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from "firebase/storage";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [imagePix, setImagePix] = useState("");
  const [view, setView] = useState([]);

  const getMyData = async () => {
    const viewData = await getDoc(doc(db, "dataBox", id));
    setView(viewData.data());
  };

  const Model = yup.object().shape({
    message: yup.string().required()
  });

  const { register, reset, handleSubmit } = useForm({
    resolver: yupResolver(Model)
  });

  const handlePix = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImagePix(save);

    const fileRef = ref(storage, "uploaded/" + file.name);
    const storageRef = uploadBytesResumable(fileRef, file);

    storageRef.on(
      "state_changed",
      (snapshot) => {
        const count = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(count);
      },
      (err) => console.log(err.message),
      () => {
        getDownloadURL(storageRef.snapshot.ref).then((url) => {
          console.log(url);
          setImage(url);
        });
      }
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { message } = data;
    const viewDoc = doc(db, "dataBox", id);
    await updateDoc(viewDoc, { message });

    reset();
    navigate("/");
  });

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <Card onSubmit={onSubmit}>
            <Image src={view?.image} />
            <div>{view?.name}</div>

            <Label>Change your Message</Label>
            <Input placeholder="Message" {...register("message")} />

            <Button type="submit">Submit</Button>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default DetailPage;

const Button = styled.button`
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px 0;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Label = styled.label`
  color: #004080;
  margin-top: 10px;
`;
const Input = styled.input`
  margin: 10px 0;
  height: 40px;
  width: 300px;
  border-radius: 3px;
  padding-left: 5px;
  outline: none;
  border: 1px soild lightgray;

  ::placeholder {
    font-family: Raleway;
    font-size: 16px;
  }
`;

const ImageLabel = styled.label`
  border-radius: 20px;
  padding: 10px 20px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
  background: gray;
  margin-bottom: 30px;
`;

const Card = styled.form`
  width: 500px;
  min-height: 300px;
  background: white;
  border-radius: 5px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background: lightgray;
`;
