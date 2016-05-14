var expect = require('chai').expect;
var crayons = require('../src/index.js');
var byteConverter = require('../src/byteConverter.js');

describe("known box values #1", function () {
  var colors = [
    { r: 251, g: 229, b: 127 },
    { r: 250, g: 177, b: 113 },
    { r: 119, g: 221, b: 133 },
    { r: 240, g: 116, b: 100 }
  ];
  var box = crayons.box(colors);

  it("generates expected color", function () {
    expect(box.pick(0.1)).to.equal('#ffbe74');
  });
  it("generates expected color", function () {
    expect(box.pick(0.3)).to.equal('#c0c47a');
  });
  it("generates expected color", function () {
    expect(box.pick(0.6)).to.equal('#80d182');
  });
  it("generates expected color", function () {
    expect(box.pick(0.9)).to.equal('#db8569');
  });
});

describe("known box values box #2", function () {
  var colors = [
    { r: 251, g: 229, b: 127 },
    { r: 250, g: 177, b: 113 },
    { r: 119, g: 221, b: 133 },
    { r: 240, g: 116, b: 100 },
    { r:  39, g: 173, b:  66 }
  ];
  var box = crayons.box(colors);

  it("generates expected color", function () {
    expect(box.pick(0.0)).to.equal('#fbe57f');
  });
  it("generates expected color", function () {
    expect(box.pick(0.2)).to.equal('#bcc67a');
  });
  it("generates expected color", function () {
    expect(box.pick(0.4)).to.equal('#87cd81');
  });
  it("generates expected color", function () {
    expect(box.pick(0.6)).to.equal('#ec7d6a');
  });
  it("generates expected color", function () {
    expect(box.pick(0.8)).to.equal('#a68454');
  });
  it("generates expected color", function () {
    expect(box.pick(1.0)).to.equal('#27ad42');
  });
});

describe("interpolation extremes", function () {
  var colors = [
    { r: 255, g: 255, b: 255 },
    { r:   0, g:   0, b:   0 }
  ];
  var box = crayons.box(colors);

  it("should return lowest color for negative percentage", function () {
    expect(box.pick(-0.3)).to.equal('#ffffff');
  });
  it("should return normal value in the middle", function () {
    expect(box.pick(0.5)).to.equal('#808080');
  });
  it("should return highest color for percentage over 1.0", function () {
    expect(box.pick(1.01)).to.equal('#000000');
  });
});

describe("ensure color order is enforced", function () {
  var box1 = crayons.box([{ r: 255, g:   0, b:   0 }, { r:  80, g:   0, b:   0 }]);
  var box2 = crayons.box([{ r:  80, g:   0, b:   0 }, { r: 255, g:   0, b:   0 }]);

  it("should find expected color for 33% in box #1", function () {
    expect(box1.pick(0.33)).to.equal('#cc0000');
  });
  it("should find expected color for 75% in box #1", function () {
    expect(box1.pick(0.75)).to.equal('#740000');
  });
  it("should find expected color for 33% in box #2", function () {
    expect(box2.pick(0.33)).to.equal('#830000');
  });
  it("should find expected color for 75% in box #2", function () {
    expect(box2.pick(0.75)).to.equal('#db0000');
  });
});

describe("when picking many", function () {
  var box = crayons.box([{ r: 128, g: 80, b: 186 }, { r: 237, g: 128, b: 99 }]);

  it("should return 10", function () {
    var colors = box.generate(10);
    expect(colors.length).to.equal(10);
  });
  it("should return 6", function () {
    var colors = box.generate(6);
    expect(colors.length).to.equal(6);
  });
});

describe("byteConverter", function () {
  it("should round as expected", function () {
    expect(byteConverter(0.0)).to.equal(0);
  });
  it("should round as expected", function () {
    expect(byteConverter(168.55)).to.equal(169);
  });
  it("should round as expected", function () {
    expect(byteConverter(41.01)).to.equal(41);
  });
});
