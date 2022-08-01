import { fileURLToPath } from 'url';
import { dirname } from 'path';

// module.exports = {
//     __dirname: __dirname
// };

const config = {
    __dirname: dirname(fileURLToPath(import.meta.url))
};

export default config;