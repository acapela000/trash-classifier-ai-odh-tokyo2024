import { Colors, Icons } from './constants';

export enum TrashClassification {
  PLASTIC = 0,
  PET = 1,
  GLASS = 2,
  CARDBOARD = 3,
  RAW_TRASH = 4,
  CAN = 5,
}

const colors = {
  [TrashClassification.PLASTIC]: Colors.purple,
  [TrashClassification.PET]: Colors.green,
  [TrashClassification.GLASS]: Colors.red,
  [TrashClassification.CARDBOARD]: Colors.amber,
  [TrashClassification.RAW_TRASH]: Colors.purple,
  [TrashClassification.CAN]: Colors.blue,
};

export const IconsList = {
  [TrashClassification.PLASTIC]: Icons.plastic,
  [TrashClassification.PET]: Icons.pet,
  [TrashClassification.GLASS]: Icons.glass,
  [TrashClassification.CARDBOARD]: Icons.cardboard,
  [TrashClassification.RAW_TRASH]: Icons.rayTrash,
  [TrashClassification.CAN]: Icons.can,
};

// Layout for the icons, either 1, 2, 3, or 4 icons per day (cell)
const layouts = [
  [[0, 0]],
  [
    [-0.25, 0],
    [0.25, 0],
  ],
  [
    [0, -0.2],
    [-0.2, 0.2],
    [0.2, 0.2],
  ],
  [
    [-0.25, -0.25],
    [-0.25, 0.25],
    [0.25, -0.25],
    [0.25, 0.25],
  ],
];

// Icons per day
const MockIconList = [
  ['2024-10-6', [TrashClassification.PLASTIC, TrashClassification.PET]],
  ['2024-10-7', [TrashClassification.GLASS]],
  ['2024-10-20', [TrashClassification.CARDBOARD]],
  [
    '2024-10-30',
    [
      TrashClassification.RAW_TRASH,
      TrashClassification.CAN,
      TrashClassification.CARDBOARD,
      TrashClassification.PET,
    ],
  ],
  ['2024-10-24', [TrashClassification.PLASTIC, TrashClassification.PET]],
];
export const IconsOnDate = Array.from({ length: 31 }).map((_, index) => {
  return [
    `2024-10-${index + 1}`,
    MockIconList.find((d) => d[0] === `2024-10-${index + 1}`)?.[1] || [],
  ];
});

// Render the icons in each cell of the calendar
export function RenderItem(
  params: any,
  api: any,
  echarts: any,
  size: { width: number; height: number }
) {
  const cellPoint = api.coord(api.value(0));
  const cellWidth: number = (params.coordSys as any).cellWidth;
  const cellHeight: number = (params.coordSys as any).cellHeight;

  const values = api.value(1) as string[];

  if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
    return;
  }

  const group: echarts.CustomSeriesRenderItemReturn = {
    type: 'group',
    children:
      (layouts[values.length - 1] || []).map(function (
        itemLayout,
        index: number
      ) {
        const pos = +values[index] as TrashClassification;
        return {
          type: 'path',
          shape: {
            pathData: IconsList[pos],
            x: -8,
            y: -8,
            width: size.width,
            height: size.height,
          },
          position: [
            cellPoint[0] +
              echarts.number.linearMap(
                itemLayout[0],
                [-0.5, 0.5],
                [-cellWidth / 2, cellWidth / 2]
              ),
            cellPoint[1] +
              echarts.number.linearMap(
                itemLayout[1],
                [-0.5, 0.5],
                [-cellHeight / 2 + 20, cellHeight / 2]
              ),
          ],
          style: api.style({
            fill: colors[pos],
          }),
        };
      }) || [],
  };

  group.children.push({
    type: 'text',
    style: {
      x: cellPoint[0],
      y: cellPoint[1] - cellHeight / 2 + 15,
      text: echarts.format.formatTime('dd', api.value(0)),
      fill: '#777',
      textFont: api.font({ fontSize: 14 }),
    },
  });

  return group;
}
