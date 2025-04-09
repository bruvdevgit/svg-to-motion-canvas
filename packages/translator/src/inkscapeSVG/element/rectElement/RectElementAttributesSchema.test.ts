import t from 'tap';
import { _RectElementAttributesSchema, RectElementAttributes } from './RectElementAttributesSchema';
import { INode } from 'svgson';
import { RectElementFields } from './RectElement';

const rects: {
  svgsonNode: INode,
  attributes: RectElementAttributes,
  props: RectElementFields,
}[] = [
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#2ca02c;fill-opacity:1;stroke:#1300ff;stroke-width:1.23096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect1",
          "width": "82.803673",
          "height": "25.728548",
          "x": "9.0465326",
          "y": "10.700179",
          "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect1",
        "width": 82.803673,
        "height": 25.728548,
        "x": 9.0465326,
        "y": 10.700179,
        label: "green-fill-and-stroke-rect-x-long-sharp-corners",
        "fill": "#2ca02c",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 1.23096,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": [],
      },
      attributes: {
        "id": "rect1",
        "style": {
          "fill": "#2ca02c",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "1.23096",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "82.803673",
        "height": "25.728548",
        "x": "9.0465326",
        "y": "10.700179",
        "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#d40000;fill-opacity:1;stroke:#1300ff;stroke-width:1.73211;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect2",
          "width": "81.960045",
          "height": "81.960045",
          "x": "8.8836927",
          "y": "78.336815",
          "ry": "0",
          "inkscape:label": "red-fill-and-stroke-rect-square-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect2",
        label: "red-fill-and-stroke-rect-square-sharp-corners",
        "width": 81.960045,
        "height": 81.960045,
        "x": 8.8836927,
        "y": 78.336815,
        "ry": 0,
        "fill": "#d40000",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 1.73211,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        children: [],
      },
      attributes: {
        "id": "rect2",
        "style": {
          "fill": "#d40000",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "1.73211",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "81.960045",
        "height": "81.960045",
        "x": "8.8836927",
        "y": "78.336815",
        "ry": "0",
        "inkscape:label": "red-fill-and-stroke-rect-square-sharp-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#ffcc00;fill-opacity:1;stroke:#1300ff;stroke-width:0.942981;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect3",
          "width": "44.620049",
          "height": "44.620049",
          "x": "7.3198247",
          "y": "167.9606",
          "ry": "10.748698",
          "inkscape:label": "yellow-fill-and-stroke-rect-square-rounded-corners"
        },
        "children": []
      },
      props: {
        "id": "rect3",
        "width": 44.620049,
        "height": 44.620049,
        "x": 7.3198247,
        "y": 167.9606,
        "ry": 10.748698,
        label: "yellow-fill-and-stroke-rect-square-rounded-corners",
        "fill": "#ffcc00",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 0.942981,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect3",
        "style": {
          "fill": "#ffcc00",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "0.942981",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "44.620049",
        "height": "44.620049",
        "x": "7.3198247",
        "y": "167.9606",
        "ry": "10.748698",
        "inkscape:label": "yellow-fill-and-stroke-rect-square-rounded-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#c87137;fill-opacity:1;stroke:#1300ff;stroke-width:0.942981;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect4",
          "width": "44.620049",
          "height": "44.620049",
          "x": "7.3198218",
          "y": "218.05432",
          "ry": "22.310024",
          "inkscape:label": "brown-fill-and-stroke-rect-square-circular"
        },
        "children": []
      },
      props: {
        "id": "rect4",
        "width": 44.620049,
        "height": 44.620049,
        "x": 7.3198218,
        "y": 218.05432,
        "ry": 22.310024,
        label: "brown-fill-and-stroke-rect-square-circular",
        "fill": "#c87137",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 0.942981,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect4",
        "style": {
          "fill": "#c87137",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "0.942981",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "44.620049",
        "height": "44.620049",
        "x": "7.3198218",
        "y": "218.05432",
        "ry": "22.310024",
        "inkscape:label": "brown-fill-and-stroke-rect-square-circular"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#c83782;fill-opacity:1;stroke:#1300ff;stroke-width:1.18864;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect5",
          "width": "84.983978",
          "height": "20.706318",
          "x": "6.9583092",
          "y": "46.336018",
          "ry": "10.353159",
          "inkscape:label": "purple-fill-and-stroke-rect-x-long-rounded-corners"
        },
        "children": []
      },
      props: {
        "id": "rect5",
        "width": 84.983978,
        "height": 20.706318,
        "x": 6.9583092,
        "y": 46.336018,
        "ry": 10.353159,
        label: "purple-fill-and-stroke-rect-x-long-rounded-corners",
        "fill": "#c83782",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 1.18864,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect5",
        "style": {
          "fill": "#c83782",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "1.18864",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "84.983978",
        "height": "20.706318",
        "x": "6.9583092",
        "y": "46.336018",
        "ry": "10.353159",
        "inkscape:label": "purple-fill-and-stroke-rect-x-long-rounded-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#37bbc8;fill-opacity:1;stroke:#1300ff;stroke-width:1.328;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect6",
          "width": "33.072918",
          "height": "93.430992",
          "x": "56.762016",
          "y": "168.66684",
          "ry": "0",
          "inkscape:label": "blue-fill-and-stroke-rect-y-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect6",
        "width": 33.072918,
        "height": 93.430992,
        "x": 56.762016,
        "y": 168.66684,
        "ry": 0,
        label: "blue-fill-and-stroke-rect-y-long-sharp-corners",
        "fill": "#37bbc8",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 1.328,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect6",
        "style": {
          "fill": "#37bbc8",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "1.328",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "33.072918",
        "height": "93.430992",
        "x": "56.762016",
        "y": "168.66684",
        "ry": "0",
        "inkscape:label": "blue-fill-and-stroke-rect-y-long-sharp-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#2ca02c;stroke-width:1.25184;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect7",
          "width": "85.706055",
          "height": "25.70767",
          "x": "195.82663",
          "y": "10.639688",
          "inkscape:label": "green-stroke-only-rect-x-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect7",
        "width": 85.706055,
        "height": 25.70767,
        "x": 195.82663,
        "y": 10.639688,
        label: "green-stroke-only-rect-x-long-sharp-corners",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#2ca02c",
        "strokeWidth": 1.25184,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect7",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#2ca02c",
          "stroke-width": "1.25184",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "85.706055",
        "height": "25.70767",
        "x": "195.82663",
        "y": "10.639688",
        "inkscape:label": "green-stroke-only-rect-x-long-sharp-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#d40000;stroke-width:10.55608125;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect8",
          "width": "56.121857",
          "height": "56.121857",
          "x": "207.88141",
          "y": "93.417191",
          "ry": "0",
          "inkscape:label": "red-stroke-only-rect-square-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect8",
        "width": 56.121857,
        "height": 56.121857,
        "x": 207.88141,
        "y": 93.417191,
        "ry": 0,
        label: "red-stroke-only-rect-square-sharp-corners",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#d40000",
        "strokeWidth": 10.55608125,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect8",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#d40000",
          "stroke-width": "10.55608125",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "56.121857",
        "height": "56.121857",
        "x": "207.88141",
        "y": "93.417191",
        "ry": "0",
        "inkscape:label": "red-stroke-only-rect-square-sharp-corners"
      }
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#ffcc00;stroke-width:13.1177;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect9",
          "width": "31.228392",
          "height": "31.228392",
          "x": "199.78725",
          "y": "176.33945",
          "ry": "7.5227299",
          "inkscape:label": "yellow-stroke-only-rect-square-rounded-corners"
        },
        "children": []
      },
      props: {
        "id": "rect9",
        "width": 31.228392,
        "height": 31.228392,
        "x": 199.78725,
        "y": 176.33945,
        "ry": 7.5227299,
        label: "yellow-stroke-only-rect-square-rounded-corners",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#ffcc00",
        "strokeWidth": 13.1177,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect9",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#ffcc00",
          "stroke-width": "13.1177",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "31.228392",
        "height": "31.228392",
        "x": "199.78725",
        "y": "176.33945",
        "ry": "7.5227299",
        "inkscape:label": "yellow-stroke-only-rect-square-rounded-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#c87137;stroke-width:19.5042;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect10",
          "width": "26.646238",
          "height": "26.646238",
          "x": "202.51251",
          "y": "227.94759",
          "ry": "13.323119",
          "rx": "13.323119",
          "inkscape:label": "brown-stroke-only-rect-square-circular"
        },
        "children": []
      },
      props: {
        "id": "rect10",
        "width": 26.646238,
        "height": 26.646238,
        "x": 202.51251,
        "y": 227.94759,
        "ry": 13.323119,
        "rx": 13.323119,
        label: "brown-stroke-only-rect-square-circular",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#c87137",
        "strokeWidth": 19.5042,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect10",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#c87137",
          "stroke-width": "19.5042",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "26.646238",
        "height": "26.646238",
        "x": "202.51251",
        "y": "227.94759",
        "ry": "13.323119",
        "rx": "13.323119",
        "inkscape:label": "brown-stroke-only-rect-square-circular"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#c83782;stroke-width:4.14621;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect11",
          "width": "83.472107",
          "height": "21.465435",
          "x": "196.5302",
          "y": "45.627014",
          "ry": "10.732718",
          "inkscape:label": "purple-stroke-only-rect-x-long-rounded-corners"
        },
        "children": []
      },
      props: {
        "id": "rect11",
        "width": 83.472107,
        "height": 21.465435,
        "x": 196.5302,
        "y": 45.627014,
        "ry": 10.732718,
        label: "purple-stroke-only-rect-x-long-rounded-corners",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#c83782",
        "strokeWidth": 4.14621,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect11",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#c83782",
          "stroke-width": "4.14621",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "83.472107",
        "height": "21.465435",
        "x": "196.5302",
        "y": "45.627014",
        "ry": "10.732718",
        "inkscape:label": "purple-stroke-only-rect-x-long-rounded-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:none;fill-opacity:1;stroke:#37bbc8;stroke-width:22.449;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect12",
          "width": "17.821806",
          "height": "75.46225",
          "x": "255.37695",
          "y": "181.09677",
          "ry": "0",
          "inkscape:label": "blue-stroke-only-rect-y-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect12",
        "width": 17.821806,
        "height": 75.46225,
        "x": 255.37695,
        "y": 181.09677,
        "ry": 0,
        label: "blue-stroke-only-rect-y-long-sharp-corners",
        "fill": "none",
        "fillOpacity": 1,
        "stroke": "#37bbc8",
        "strokeWidth": 22.449,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect12",
        "style": {
          "fill": "none",
          "fill-opacity": "1",
          "stroke": "#37bbc8",
          "stroke-width": "22.449",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "17.821806",
        "height": "75.46225",
        "x": "255.37695",
        "y": "181.09677",
        "ry": "0",
        "inkscape:label": "blue-stroke-only-rect-y-long-sharp-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#2ca02c;fill-opacity:1;stroke:none;stroke-width:1.23096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect18",
          "width": "82.803673",
          "height": "25.728548",
          "x": "103.76017",
          "y": "26.485786",
          "inkscape:label": "green-fill-only-rect-x-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect18",
        "width": 82.803673,
        "height": 25.728548,
        "x": 103.76017,
        "y": 26.485786,
        label: "green-fill-only-rect-x-long-sharp-corners",
        "fill": "#2ca02c",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 1.23096,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect18",
        "style": {
          "fill": "#2ca02c",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "1.23096",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "82.803673",
        "height": "25.728548",
        "x": "103.76017",
        "y": "26.485786",
        "inkscape:label": "green-fill-only-rect-x-long-sharp-corners"
      },
    },
  ];

function removeUndefinedFields(obj: Object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != undefined));
}

t.test('parse correctly processes valid data', t => {
  const styleAttributesSchema = new _RectElementAttributesSchema();
  for (let i = 0; i < rects.length; i++) {
    const attributesSchema = rects[i].attributes;

    const found = removeUndefinedFields(styleAttributesSchema.parse(attributesSchema));
    t.same(found,
      attributesSchema, `at idx: ${i}`);
  }

  t.end();
});

t.test('parse correctly processes valid including transform', t => {
  const attributesSchema: RectElementAttributes = {
    "id": "rect1",
    "style": {
      "fill": "#2ca02c",
      "fill-opacity": "1",
      "stroke": "#1300ff",
      "stroke-width": "1.23096",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "0",
      "stroke-dasharray": "none",
      "stroke-opacity": "1",
      "paint-order": "fill markers stroke"
    },
    "width": "82.803673",
    "height": "25.728548",
    "x": "9.0465326",
    "y": "10.700179",
    "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners",
    "transform": "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)",
  };

  const styleAttributesSchema = new _RectElementAttributesSchema();

  const found = removeUndefinedFields(styleAttributesSchema.parse(attributesSchema));
  const wanted = attributesSchema;
  t.same(found, wanted);
  t.end();
});
