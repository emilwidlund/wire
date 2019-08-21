import * as React from 'react';
import { Context } from 'wire-core';

import { Canvas } from '../Canvas';

const context = Context.import(localStorage.getItem('wire_context'));
// const context = new Context();

export const App = () => {
    return (
        <div id="app">
            <Canvas context={context} />
        </div>
    );
};
