module.exports = {
  name: "season",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/season",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
