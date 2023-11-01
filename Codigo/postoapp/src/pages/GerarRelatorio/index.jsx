import LeftNavMenu from '../../Layout/LeftNavMenu';

const GerarRelatorio = () => {


    return(
        <main className="container-fluid">
            <div className='row'  id="listausuarios">
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-9'>
       
                <h1 id="titulo">Geração de Relatório</h1>
             
            </div>
            </div>
           

        </main>
    )
}

export default GerarRelatorio