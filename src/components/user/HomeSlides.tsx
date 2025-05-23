const HomeSlides =()=> {


    return (<div id="Carouseljuegos" className="carousel slide position-relative bg-secondary text-white text-center p-5 rounded" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="..." className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Imagen 1</h5>
                                <p id="desc1">Descripción 1</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Imagen 2</h5>
                                <p id="desc2">Descripción 2</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Imagen 3</h5>
                                <p id="desc3">Descripción 3</p>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#Carouseljuegos" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#Carouseljuegos" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
    );
}
export default HomeSlides
