"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vision_1 = require("@google-cloud/vision");
const client = new vision_1.ImageAnnotatorClient();
function detectLogo(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Running logo detection on ${fileName}`);
            const [result] = yield client.logoDetection(fileName);
            let scores = [];
            const logos = result.logoAnnotations || [];
            if (logos.length > 0) {
                logos.forEach((logo) => {
                    if (logo.description) {
                        console.log(`"${logo.description}" found in file ${fileName}`);
                    }
                    if (logo.score) {
                        scores.push(logo.score);
                    }
                });
                const avg = scores.reduce((a, b) => a + b) / scores.length;
                console.log(`Average score for ${fileName}: ${avg}`);
            }
            else {
                console.log(`No logos detected in ${fileName}`);
            }
        }
        catch (err) {
            // Handle file not found and other errors
            if (err.code === 'ENOENT') {
                console.log(`File ${fileName} not found`);
            }
            else {
                console.log(`Error processing file ${fileName}: ${err.message}`);
            }
        }
    });
}
/**
 * Runs logo detection on the given list of file names and logs the description and average score of each logo.
 * @param fileNames - An array of file names to run logo detection on.
 */
function main(fileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const fileName of fileNames) {
            yield detectLogo(fileName);
        }
    });
}
// Run the detection for a list of files
main([
    './images/cmu.jpg',
    './images/logo-types-collection.jpg',
    './images/not-a-file.jpg'
]);
