import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styled, {css} from 'styled-components';
import get from 'lodash/get';
import {i18n, withTranslation} from '@library/i18next/configureI18Next'
import screen from '@themes/Screen';
import {Formik} from 'formik';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(4, 'Too Long!')
        .required('Required'),
    message: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
});


const Contact = ({t}) => {
    const [isVisibleNavbar, setVisibleNavbar] = useState(false);

    const changeLocale = () => {
        switch (i18n.language) {
            case 'en-US':
                i18n.changeLanguage('zh-CN');
                break;
            case 'zh-CN':
                i18n.changeLanguage('vi-VN');

                break;
            case 'vi-VN':
                i18n.changeLanguage('th-TH');

                break;
            case 'th-TH':
                i18n.changeLanguage('en-US');
                break;
        }
    };


    const handleCheckSubmit = (values, {setSubmitting}) => {

    };


    return (
        <div className="d-flex flex-column" style={{height: 'inherit'}}>
            <header className="col-auto" style={{height: 120}}>
                <NavbarArea>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-24">
                                <Navbar className="navbar navbar-expand-lg">
                                    <Link href="/examples">
                                        <a className="navbar-brand">
                                            IMNEXT.js
                                        </a>
                                    </Link>


                                    <button className="navbar-toggler" type="button"
                                            onClick={() => setVisibleNavbar(!isVisibleNavbar)}>
                                        {t('examples:button.menu')}
                                    </button>

                                    <NavbarCollapse className="navbar-collapse sub-menu-bar collapse"
                                                    isVisible={isVisibleNavbar}>
                                        <ul className="navbar-nav m-auto">
                                            <NavItem className="active">
                                                <Link href="/examples">
                                                    <a>{t('examples:menu.home')}</a>
                                                </Link>
                                            </NavItem>

                                            <NavItem>
                                                <Link href="/examples/contact">
                                                    <a>{t('examples:menu.contact')}</a>
                                                </Link>
                                            </NavItem>
                                        </ul>
                                    </NavbarCollapse>


                                    <div className="navbar-btn d-none d-flex">
                                        <MainBtn type="button" className="btn col-auto mr-2"
                                                 onClick={changeLocale}>{t('examples:language')}</MainBtn>
                                    </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </NavbarArea>

            </header>


            <section className="contact-area col">
                <div className="container">

                    <Formik
                        initialValues={{name: '', email: '', message: ''}}
                        validationSchema={SignupSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              validateForm
                              /* and other goodies */
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <Label>Enter Your Name</Label>
                                        <Input type="text" name="name" placeholder="Full Name"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.name}
                                        />
                                        <Message>{errors.name && touched.name && errors.name}</Message>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Label>Enter Your Email</Label>
                                        <Input type="email" name="email" placeholder="Email"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.email}
                                        />
                                        <Message>{errors.email && touched.email && errors.email}</Message>
                                    </div>
                                    <div className="col-md-24 mb-4">
                                        <Label>Your Message</Label>
                                        <Textarea name="message" placeholder="Enter your message..."
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={values.message}></Textarea>
                                        <Message>{errors.message && touched.message && errors.message}</Message>

                                    </div>
                                    <p className="form-message"></p>
                                    <div className="col-md-24">

                                        <MainBtn type="submit" onClick={() => {
                                            validateForm().then((errors) => {
                                                const field = get(Object.keys(errors), 0, false);
                                                if (field) {
                                                    alert(errors[field]);
                                                }
                                            });
                                        }}>Send Now</MainBtn>


                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>


                </div>
            </section>


            <Footer className="col-auto">
                <div className="container">
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">
                            © 2020 Crafted by
                            <a href="https://github.com/imagine10255/imnext" target="_blank"
                               rel="nofollow">imagine</a> All
                            Rights Reserved.</p>
                    </FooterCopyRight>
                </div>
            </Footer>


        </div>
    )
};


Contact.getInitialProps = async () => ({
    namespacesRequired: ['examples'],
});


export default withTranslation()(Contact)


const HeaderHero = styled.div`
    background-image: url("/static/images/examples/header-bg.jpg");
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 130px;
    
    @media ${screen.lg} {
        padding-top: 0;
    }
`;

const NavbarArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    transition: all 0.3s ease-out 0s;
    
    will-change: transform;
`;

const Navbar = styled.nav`
    padding: 25px 0;
    border-radius: 5px;
    position: relative;
    transition: all 0.3s ease-out 0s;
`;


const NavItem = styled.li`
      margin-left: 00;
      position: relative;
    
      :first-child {
        margin-left: 0;
      }
      
      &.active > a, :hover > a{
        color: #f14836;
      }
      
      a{
        font-size: 16px;
        font-weight: 900;
        color: #222;
        transition: all 0.3s ease-out 0s;
        
        position: relative;
        font-family: "Nunito", sans-serif;
        
        display: block;
        padding: 4px 0;
     }
     
     
     @media ${screen.md} {
        
        a{
          padding: 10px 0;
        }
    }
     
     @media ${screen.lg} {
        margin-left: 40px;
        
        a{
          padding: 4px 0;
        }
    }
    

`;


const MainBtn = styled.button`
    display: inline-block;
    font-weight: 700;
    font-family: "Nunito", sans-serif;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    
    user-select: none;
    border: 2px solid #f14836;
    padding: 0 30px;
    font-size: 16px;
    height: 55px;
    line-height: 51px;
    border-radius: 50px;
    color: #fff;
    cursor: pointer;
    z-index: 5;
    transition: all 0.4s ease-out 0s;
    background-color: #f14836;
    
`


const HeaderHeroContent = styled.div`
`;

const HeroTitle = styled.h1`
    font-size: 28px;

    font-weight: 400;
    color: #000;
    
    b {
      font-weight: 700;
    }
    
    span {
        color: #f14836;
        display: contents;
    }
    
    @media ${screen.lg} {
        font-size: 60px;
    }
`;

const HeroText = styled.p`
    font-family: "Nunito", sans-serif;
    max-width: 490px;
    font-size: 16px;
    
    font-weight: 400;
    line-height: 24px;
    color: #798795;
    margin-bottom: 50px;
`;

const HeroSignup = styled.div`
    position: relative;
    z-index: 9;

    input{
      width: 100%;
      height: 56px;
      border: 0;
      border-radius: 50px;
      padding: 0 30px;
      background-color: #fff;
      box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
      margin-bottom: 10px;
    }
    
    @media ${screen.lg} {
        
        input{
            height: 70px;
            font-size: 24px;
            
        }
    }
`;


const HeroSignupMainBtn = styled(MainBtn)`
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    height: 56px;
    line-height: 52px;
      
    
     @media ${screen.lg} {
        position: absolute;
        top: 3px;
        right: 3px;
        height: 64px;
        line-height: 60px;
        padding: 0 40px;
        text-transform: uppercase;
        letter-spacing: 1px;
        width: auto;
        height: auto;
     }

`;


const NavbarCollapse = styled.div`
    
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 5px 12px;
       
    ${props => !props.isVisible && css`
        display: none;  
    `}




    @media ${screen.lg} {
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;
        display: block;
        
        position: static;
        box-shadow: none;
        background-color: transparent;
        top: auto;
        left: auto;
    }
`;


const Footer = styled.footer`
    background-image: url("/static/images/examples/footer-bg.jpg");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
`;


const FooterCopyRight = styled.div`
    padding: 25px;
    border-top: 1px solid #dedede4f;
`;


const LanguageButton = styled.button`
    line-height: 100%;
    padding: 0;
`;


const Input = styled.input`
  width: 100%;
    border-radius: 7px;
    background-color: #fff;
    padding: 0 30px;
    height: 65px;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 18px;
`;

const Textarea = styled.textarea`
    padding: 0 30px;
    padding-top: 10px;
    height: 270px;
    resize: none;
    width: 100%;
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 18px;
`;

const Label = styled.label`
    margin-bottom: 10px;
    display: block;
    font-size: 18px;
    color: #222;
`

const Message = styled.div`
  color: #f14836;
`;