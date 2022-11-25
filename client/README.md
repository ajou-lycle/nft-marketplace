## My info

```js
// 유저 지갑 주소 가져오는 방법
const [eth, setEthState] = useRecoilState(ethState);
const walletAddress = eth.accounts[0];

// 유저 지갑 잔고 가져오는 방법
const [eth, setEthState] = useRecoilState(ethState);
const coinBalance = await getUserCoinBalance(eth);

// 유저 토큰 잔고 가져오는 방법
const [eth, setEthState] = useRecoilState(ethState);
const tokenBalance = await getTokenBalance(eth);

// 유저가 보유한 NFT 리스트 가져오는 방법
const [eth, setEthState] = useRecoilState(ethState);
const userNftJsonList = await getNftListByWalletAddress(eth);
```

## NFT Json 형식

```json
{
  "name": "Lack of sleep lama #1",
  "description": "This lama is lack of sleep now because of assignment. And often loses sleep because of mosquitoes. Please catch up on some sleep for the lama.",
  "image": "https://lycle-bucket.s3.ap-northeast-2.amazonaws.com/0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/png/1.png",
  "dna": "9a005ad27af3e4c9c0726a19b00f323dff057b56",
  "edition": 1,
  "date": 1667997712363,
  "grade": "normal",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Skyblue"
    },
    {
      "trait_type": "Body",
      "value": "body"
    },
    {
      "trait_type": "Eyes",
      "value": "line dark circle"
    },
    {
      "trait_type": "Mouth",
      "value": "Close"
    },
    {
      "trait_type": "Cheek",
      "value": "none"
    },
    {
      "trait_type": "Accessory",
      "value": "Sun"
    }
  ],
  "compiler": "HashLips Art Engine"
}
```
