<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld" version="1.0.0" xmlns:gml="http://www.opengis.net/gml">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>MSG_202308140600_ir_cloud_day_aoi</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:ChannelSelection>
              <sld:GrayChannel>
                <sld:SourceChannelName>1</sld:SourceChannelName>
                <sld:ContrastEnhancement>
                  <sld:Normalize>
                    <sld:VendorOption name="algorithm">StretchToMinimumMaximum</sld:VendorOption>
                    <sld:VendorOption name="minValue">0</sld:VendorOption>
                    <sld:VendorOption name="maxValue">255</sld:VendorOption>
                  </sld:Normalize>
                </sld:ContrastEnhancement>
              </sld:GrayChannel>
            </sld:ChannelSelection>
            <sld:ColorMap>
              <sld:ColorMapEntry quantity="0" color="#000000" opacity="0"/>
              <sld:ColorMapEntry quantity="5" color="#000000" opacity="0"/>
              <sld:ColorMapEntry quantity="255" color="#ffffff"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
