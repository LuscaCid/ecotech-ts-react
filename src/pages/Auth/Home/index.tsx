
export function AuthHome() {
    return (
        <div >
            <header >
                <h1><span >&#127810;</span>EcoTech</h1>
                
            </header>

            <div className="main-content">
                <h1 style={{ fontSize: '4rem', color: '#35ce3b' }}>BEM - VINDO A ECOTECH</h1>
              
                <p><h1>A RECICLAGEM TRANSFORMA COISAS EM OUTRAS, O QUE É QUASE MÁGICO.</h1></p>
                <br />
                <p><h1>Faça o seu descarte de resíduos de forma segura, ajude o planeta e ainda tenha a oportunidade de converter em dinheiro.</h1></p>
                <div className="cta-buttons">
                    <a href="./src/pages/signup/index.html" className="cta-button left-button">Cadastre-se</a>
                    <a href="./src/pages/signin/index.html" className="cta-button">Login</a>
                </div>
            </div>

            <footer>
                CERCA DE 43% DE TODO O LIXO GERADO NO PAÍS TEVE DESCARTE IRREGULAR, - APONTA A PESQUISA PANORAMA DOS RESÍDUOS SÓLIDOS NO BRASIL EM 2023, LANÇADA PELA ASSOCIAÇÃO BRASILEIRA DE RESÍDUOS E MEIO AMBIENTE (ABREMA).
            </footer>
        </div>
    );
}

