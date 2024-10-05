import styled from "styled-components";

const ContSlide = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #050505;
`;

const Wrapper = styled.div`
  .contImg {
    width: 746px;
    height: 746px;
    border: 1px solid #f00;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1050px) {
    width: 390px;
    height: 390px;
  }
`;

const ContentsSec = () => {
  return (
    <ContSlide>
      <Wrapper>
        <div className="contImg">
          <img src="" alt="" />
        </div>
      </Wrapper>
    </ContSlide>
  );
};

export default ContentsSec;
