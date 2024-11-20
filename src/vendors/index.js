import EventEmitter from 'eventemitter3';
import _ from 'lodash';
import $ from 'jquery';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Calculate from 'services/calculate';
import Estimator from 'services/estimator';
import BitmapCanvas from 'widgets/bitmap-canvas';
import Confirm from 'widgets/confirm';
import { ProviderIndexedDB } from '../providers';

const zip = new JSZip();
const mediator = new EventEmitter();
const calc = new Calculate();
const estimator = new Estimator();
const bitmapCanvas = new BitmapCanvas();
const confirm = new Confirm();
const provider = new ProviderIndexedDB('TestEstimation');
const providerID = 'id1';

export { _, $, mediator, zip, FileSaver, bitmapCanvas, calc, estimator, confirm, provider, providerID };