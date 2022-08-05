# 프로젝트 목표

+ OpenSea.io와 같은 Ethereum 기반 NFT Marketplace를 구현하는 것이 목표입니다.
+ MetaMask 계정이 있다면 누구나 가입할 수 있도록 합니다.
+ 누구나 자유롭게 NFT를 구매&판매할 수 있도록 합니다.
+ NFT 거래 시 수수료를 발생시키고자 합니다.
+ LYCLE 한정판 NFT를 보유한 홀더에게는 발생한 수수료의 일부분을 제공하고자 합니다.

## 프로젝트 구조도

추후 업데이트

## Branch

+ main : 제품으로 출시할 시 사용합니다. 이 외에는 사용하지 않습니다.
+ develop : 다음 출시 버전을 개발하는 branch 입니다.
+ merge : client와 truffle branch를 merge하는 branch입니다. 안정되면 develop branch로 merge 합니다. 
+ truffle : EIP 기반 smart contract를 개발할 때 사용합니다.
+ client : React 기반 web을 개발할 때 사용합니다.

## 개발 팀
+ client : 이채민 님, 문다현 님
  + [README](./client/README.md)
+ truffle : 장성호 님
  + [README](./truffle/README.md)