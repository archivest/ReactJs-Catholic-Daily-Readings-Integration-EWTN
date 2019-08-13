import React, { PureComponent } from 'react';

export default class AppHeader extends PureComponent
{
    render()

    {
        return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Daily Catholic Encounter</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Daily Mass Readings <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Saint Of The Day</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Catholic Prayers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Know Your Faith</a>
                    </li>
                    </ul>
                </div>
                </nav>
        );
    }


}