import mainLogo from '../assets/img/main_logo.png';
import previewImg from '../assets/img/preview.png';
import appleBadge from '../assets/img/apple_app_store_badge.svg';
import googleBadge from '../assets/img/google_play_store_badge.png';
import nftBg from '../assets/img/nft_bg.png';
import checkIcon from '../assets/img/check.svg';
import useScrollFadeIn from "../seScrollFadeIn";
import '../landing.css';
import { Link } from 'react-router-dom';


function PageLanding() {


    return (
        <div className="App">
            <div className='main_wrapper'>
                <div className='nav'>
                    <img className='main_logo' src={mainLogo} alt='main_logo'/>
                    <div className='nav_btn'>
                        {/*<button className={'login_btn'}>로그인</button>*/}
                        {/*<button onClick={() => window.open('http://sillychat.kro.kr/index.html', '_blank')}*/}
                        {/*        className={'go_site_btn'}>무료로 시작하기</button>*/}
                    </div>
                </div>
                <section>
                    <div className='row_content'>
                        <div className='left_content'>
                            <div {...useScrollFadeIn('up', 1, 0)} className='txt_box'>
                                <h1>BARTER YOUR</h1>
                                <h1>Life-Cycle.</h1>
                                <h1>LYCLE</h1>
                            </div>
                            <p {...useScrollFadeIn('up', 1.5, 0.8)} className='txt_box_sub_txt'>건강한 생활을 통해 얻은 NFT와 토큰이라는 보상을<br/>실직적인 가치로 바꿔보세요.</p>
                            <div {...useScrollFadeIn('up', 1.5, 0.8)} className='store_btn_wrapper'>
                                <button
                                    onClick={() => window.open('https://apps.apple.com/kr/app/nft-go-nft%EC%A0%9C%EC%9E%91-%ED%8C%90%EB%A7%A4%EA%B9%8C%EC%A7%80-%EC%9B%90%EC%8A%A4%ED%86%B1-%EB%A7%88%EC%BC%93%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4/id1558876298', '_blank')}>
                                    <img src={appleBadge} alt={'apple_store_badge'}/>
                                </button>
                                {/*<button>*/}
                                {/*    <img src={googleBadge} alt={'google_play_store_badge'}/>*/}
                                {/*</button>*/}
                            </div>
                        </div>
                        <div {...useScrollFadeIn('up', 1.5, 0.4)} className='right_content preview_img_wrapper'>
                            <img src={previewImg} alt={'preview_img'}/>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='row_content'>
                        <div {...useScrollFadeIn('right', 1.5, 0.8)} className={'left_content'}>
                            <img className='nft_content_img' src={nftBg} alt={'bg_1'}/>
                        </div>
                        <div className='right_content nft_desc'>
                            <h1 {...useScrollFadeIn('up', 1, 0.5)}>
                                NFT, 더 이상 어렵게 생각하지 마세요!
                            </h1>
                            <p {...useScrollFadeIn('up', 1.4, 0.6)} className={'sub_desc'}>
                                간단한 일상생활 속 운동이나 습관을 통해 쉽게 얻을 수 있습니다.
                            </p>
                            <ul {...useScrollFadeIn('up', 1, 1)} className={'main_desc_list'}>
                                <li  style={{backgroundImage: `url(${checkIcon})`}}>
                                    건강과 돈을 둘 다 챙겨보세요
                                </li>
                                <li   style={{backgroundImage: `url(${checkIcon})`}}>
                                    건강한 습관을 길러보세요
                                </li>
                                <li  style={{backgroundImage: `url(${checkIcon})`}}>
                                    귀여운 나만의 고유 NFT를 얻어보세요
                                </li>
                            </ul>
                            <div {...useScrollFadeIn('up', 1, 1)}>
                                <Link to = "/mainPage">
                                <button className={'go_site_btn'}>
                                    지금 NFT 둘러보기
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PageLanding;
