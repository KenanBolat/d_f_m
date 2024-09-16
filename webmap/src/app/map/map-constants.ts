// want to export some constants to a separate file

export const GET_CAPABILITIES : string = "?service=WMS&request=GetCapabilities";
export const IMAGE_FORMAT : string = 'image/png';
export const WORKSPACE : string = 'tmet:';

export const LAYER_PROPERTY_TAG : string = 'Dimension';

// create some dictionary for the layer name example tmet:rgb -> natural_color , tmet:cloud -> ir_cloud

export const LAYER_NAME_DICTIONARY : Map<string, string> = new Map([
    ['natural_color', 'rgb'], // if channel name is natural_color then tmet:rgb
    ['ir_cloud_day', 'cloud'], // if channel name is ir_cloud_day then tmet:cloud
    ['HRV', 'aoi'],
    ['IR_016', 'aoi'],
    ['IR_039', 'aoi'],
    ['IR_087', 'aoi'],
    ['IR_097', 'aoi'],
    ['IR_108', 'aoi'],
    ['IR_120', 'aoi'],
    ['IR_134', 'aoi'],
    ['VIS006', 'aoi'],
    ['VIS008', 'aoi'],
    ['WV_062', 'aoi'],
    ['WV_073', 'aoi']
]);

export const aoiChannels : string[] = ['HRV', 'IR_016', 'IR_039', 'IR_087', 'IR_097', 'IR_108', 'IR_120', 'IR_134', 'VIS006', 'VIS008', 'WV_062', 'WV_073'];
