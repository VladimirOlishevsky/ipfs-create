import '../../App.css';

import SignatureCanvas from 'react-signature-canvas'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IPinataListApi } from './types';

export const Home = () => {

  const [ipfsIds, setIpfsIds] = useState<string[]>([])

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const ref = useRef() as React.MutableRefObject<SignatureCanvas>;

  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2OGM3M2M4MS1iMDI4LTRiOTgtYWVkYS1kOWFjN2FlNGZlODciLCJlbWFpbCI6ImNvc3lzb2Z0d29ya0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjc0YjA0Yzg2YjIyNWJmOTdhOTQiLCJzY29wZWRLZXlTZWNyZXQiOiI5NDYxZTM1ZjIyMzkzZTZiNWNhZGM3YTRlOTQzNDc5YWVkMmYxZTE5OWIzYjA3YTFhZDkxYzQzM2NiNmUyMjViIiwiaWF0IjoxNjQ3MTc3ODE3fQ.9aQSkBUMwlMh9yqUtBIpitjBaWuA1IENA4YDkXhUOm4'

  const getData = async () => {
    const canvas = ref.current.getCanvas();
    const fd = new FormData();

    canvas.toBlob((blob) => {
      blob && fd.append('file', blob, 'signature.png')
      const result = axios
        .post(url, fd, {
          maxContentLength: -1,
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          }
        });
      result.then((res) => {
        setIpfsIds(prev => [res.data.IpfsHash, ...prev])
        console.log('ipfsIds', ipfsIds);
      })
    })
  }

  const pinListData = () => {
    const url2 = 'https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=5'
    const result = axios
      .get<IPinataListApi>(url2, {
        maxContentLength: -1,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });
    result.then((res) => {
      const adaptData = res.data.rows.sort((a, b) => a > b ? -1 : 1).map(el => el.ipfs_pin_hash);
      setIpfsIds(adaptData)
    })
  }


  useEffect(() => {
    pinListData()
  }, [])
  console.log(ipfsIds);

  return (
    <div className="home-root">
      <div className="draw">
        <SignatureCanvas
          penColor='#FFA62B'
          backgroundColor={"#264653"}
          canvasProps={{ width: 350, height: 350 }}
          ref={ref}
        />
        <div className="buttonsBlock">
          <button className="button" onClick={() => ref.current.clear()}>clear</button>
          <button className="button" onClick={() => getData()}>get</button>
        </div>
      </div>

      <div className="img-wrapper">
        {ipfsIds.map(el => {
          return (
            <img
              key={el}
              className="img"
              // src={`https://gateway.pinata.cloud/ipfs/${el}?preview=1`}
              src={`https://ipfs.io/ipfs/${el}`}
              alt="pinata-img" />
          )
        })}
      </div>
    </div>
  );
}