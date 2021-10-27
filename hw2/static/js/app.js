function main() {
	var xRotate = 0;
	var drawer = new Canvas({
		canvasId: 'mcanvas',
		vShader: 'vertexShader2d',
		fShader: 'fragmentShader2d'
	});
	var triangle1 = new Triangle({
		points: [300, 100, 0,
			0, 100, 0,
			100, 200, 0
		],
		colors: "#ffaa7f"
	});
	var triangle2 = new Triangle({
		points: [300, 100, 0,
			0, 100, 0,
			100, 200, 0
		],
		colors: "#ffaa00"
	});
	var rectangle1 = new Quadrilateral({
		points: [
			0, 0, 0,
			100, 0, 0,
			0, 100, 0,
			100, 100, 0
		],
		colors: "#55aa7f"
	})
	var rectangle1 = new Quadrilateral({
		points: [
			0, 0, 0,
			100, 0, 0,
			0, 100, 0,
			100, 100, 0
		],
		colors: "#55aa7f"
	})
	var rectangle2 = new Quadrilateral({
		points: [
			0, 0, 0,
			100, 0, 0,
			0, 0, 100,
			100, 0, 100
		],
		colors: "#55aa00"
	});
	var rectangle3 = new Quadrilateral({
		points: [
			100, 0, 0,
			100, 0, 100,
			100, 100, 0,
			100, 100, 100
		],
		colors: "#00aa7f"
	});
	var rectangle4 = new Quadrilateral({
		points: [
			0, 100, 100,
			0, 100, 0,
			100, 100, 100,
			100, 100, 0
		],
		colors: "#00ff00"
	});
	var rectangle5 = new Quadrilateral({
		points: [
			0, 0, 0,
			0, 100, 0,
			0, 100, 100,
			0, 0, 100
		],
		colors: "#00ff7f"
	});
	var tranEntity = new Entity();
	tranEntity.addComponent(new Quadrilateral({
		points: [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		],
		colors: "#55aa7f"
	}))
	var entity = new Entity();
	entity.addComponent(new Shape({
		points: [0, 0, 0, 0, 0, 0, 0, 0, 0],
		colors: "#000000"
	}));
	var tranShape = [
		new Shape({
			points: [125, 350, 0,
				625, 350, 0,
				675, 900, 0,
				675, 900, 0,
				225, 900, 0,
				125, 350, 0,
				1425, 400, 0,
				1875, 400, 0,
				1925, 850, 0,
				1925, 850, 0,
				1525, 850, 0,
				1425, 400, 0
			],
			colors: "#000000"
		}),
		new Shape({
			points: [575, 350, 0,
				1475, 400, 0,
				1575, 850, 0,
				1475, 850, 0,
				675, 850, 0,
				575, 350, 0,
				575, 350, 0,
				1575, 850, 0,
				1475, 850, 0,
				1525, 850, -790,
				1575, 850, 0,
				675, 850, 0,
				675, 850, 0,
				675, 850, -780,
				1525, 850, -790,
				1525, 850, -790,
				1525, 1250, -760,
				775, 1300, -760,
				775, 1300, -760,
				675, 850, -780,
				1525, 850, -790
			],
			colors: "#c4a692"
		}),
		new Shape({
			points: [925, 350, 0,
				925, 750, -80,
				1125, 800, -80,
				1125, 800, -80,
				1125, 400, -80,
				925, 350, 0,
				925, 800, -810,
				1225, 850, -810,
				1125, 800, -80,
				1125, 800, -80,
				925, 750, -80,
				925, 850, -690
			],
			colors: "#c8891e"
		}),
		new Shape({
			points: [125, 350, 30,
				125, -200, 20,
				1775, -250, 20,
				1775, -250, 20,
				1825, 400, 20,
				125, 350, 30,
				125, 950, -120,
				125, 950, -120,
				125, 950, -20,
				225, 850, -20,
				225, 900, -780,
				625, 900, -790,
				625, 900, -790,
				675, 900, 0,
				225, 850, -20,
				1625, 900, -10,
				1975, 900, -10,
				1975, 900, -770,
				1975, 900, -770,
				1575, 900, -780,
				1625, 900, -10,
				1575, 900, -780,
				1575, 1250, -790,
				1975, 900, -770
			],
			colors: "#dbd9d6"
		}),
		new Shape({
			points: [775, 1300, -760,
				1525, 1200, -770,
				1525, 1450, -770,
				1525, 1450, -770,
				775, 1550, -770,
				775, 1300, -760,
				1025, 800, -770,
				1175, 850, -770,
				1225, 1250, -770,
				1225, 1250, -770,
				1175, 850, -770,
				1025, 800, -770,
				925, 850, -780,
				925, 1300, -780,
				1125, 1250, -780,
				1225, 1250, -770,
				1175, 850, -770,
				1025, 800, -770
			],
			colors: "#000000"
		})
	]
	for (let i = 0; i < tranShape.length; ++i) {
		entity.addComponent(tranShape[i])
	}



	var arrow = new Entity();
	arrow.addComponent(new Triangle({
		points: [
			50, 200, 0,
			200, 200, 0,
			125, 350, 0,
		],
		colors: "#ff0000"
	}));

	arrow.addComponent(new Quadrilateral({
		points: [
			100, 100, 0,
			100, 200, 0,
			150, 100, 0,
			150, 200, 0
		],
		colors: "#000000"
	}));



	drawer.addEntity(arrow);
	drawer.addEntity(tranEntity);

	//drawer.addEntity(tt);

	//方法1:取点器，可以使用但比较麻烦
	//drawer.addEntity(entity);

	//方法2堆格子
	var tt = new Entity();

	function responseSpaceP(arg) {
		return '\{' + 'x:' + arg.x + ',y:' + arg.y + ",z:" + arg.z + ",width:" + arg.width + ',color:"' + arg.color +
			'"\},';
	}

	function responseSpaceBlock(arg) {
		var x = 0,
			y = 0,
			z = 0,
			color = 0,
			width = 0;
		[x, y, z, colors, width] = [arg.x, arg.y, arg.z, arg.colors, arg.width];
		var entity = new Entity();
		entity.addComponent(new Shape({ //后
			points: [
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + 0, z + width
			],
			colors: colors[0]
		}))
		entity.addComponent(new Shape({ //前
			points: [
				x + width, y + 0, z + 0,
				x + width, y + width, z + 0,
				x + width, y + width, z + width,

				x + width, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + width, y + width, z + width,

			],
			colors: colors[1]
		}))
		entity.addComponent(new Shape({ //左
			points: [
				x + 0, y + 0, z + 0,
				x + width, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + 0, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + 0, y + 0, z + width
			],
			colors: colors[2]
		}))
		entity.addComponent(new Shape({ //右
			points: [
				x + 0, y + width, z + width,
				x + width, y + width, z + width,
				x + width, y + width, z + 0,
				x + width, y + width, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + width, z + 0
			],
			colors: colors[3]
		}))
		entity.addComponent(new Shape({ //上
			points: [
				x + 0, y + 0, z + width,
				x + 0, y + width, z + width,
				x + width, y + width, z + width,
				x + 0, y + 0, z + width,
				x + width, y + width, z + width,
				x + width, y + 0, z + width
			],
			colors: colors[4]
		}))
		entity.addComponent(new Shape({ //下
			points: [
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + 0,
				x + width, y + width, z + 0,
				x + 0, y + 0, z + 0,
				x + width, y + width, z + 0,
				x + width, y + 0, z + 0
			],
			colors: colors[5]
		}))
		return entity;
	}

	function responseSpaceCurPosition(arg) {
		return new Shape({
			points: arg.curpoints,
			colors: arg.color
		});
	}

	function responseSpacePPosition(arg) {
		return 'new Shape({\n' +
			'points:[' + curPos2Str() +
			'],colors:' + '"' + arg.color + '"' +
			'})'
	}
	drawer.addEntity(tt)

	function pointerChanger(theta, curpoints, point) {
		for (let i = 0; i < curpoints.length / 3; ++i) {
			if (Math.sqrt((curpoints[i * 3 + 0] - point[0]) * (curpoints[i * 3 + 0] - point[0]) +
					(curpoints[i * 3 + 1] - point[1]) * (curpoints[i * 3 + 1] - point[1]) +
					(curpoints[i * 3 + 2] - point[2]) * (curpoints[i * 3 + 2] - point[2])) < theta) {
				return [curpoints[i * 3 + 0], curpoints[i * 3 + 1], curpoints[i * 3 + 2]]
			}
		}
		return point;
	}
	var dogHead = [{
			x: 125,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 725,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: 350,
			z: 200,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: 350,
			z: 400,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: 350,
			z: 600,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: 350,
			z: 800,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 350,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 350,
			z: 200,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 350,
			z: 400,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 350,
			z: 600,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 350,
			z: 800,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: 150,
			z: 800,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 150,
			z: 600,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 150,
			z: 400,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 150,
			z: 200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 125,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 325,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 525,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 725,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 150,
			z: 0,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 150,
			z: 200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 150,
			z: 400,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 150,
			z: 600,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 150,
			z: 800,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 150,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -50,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -250,
			z: 0,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -250,
			z: 200,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 200,
			width: 200,
			color: "#000000"
		},
		{
			x: 125,
			y: -50,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: -75,
			y: -50,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: -75,
			y: -250,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 125,
			y: -250,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 725,
			y: -250,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 925,
			y: -250,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 925,
			y: -50,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 725,
			y: -50,
			z: 0,
			width: 200,
			color: "#eed2aa"
		},

		{
			x: 325,
			y: -250,
			z: 400,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 400,
			width: 200,
			color: "#000000"
		},


		{
			x: 125,
			y: -250,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -250,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -250,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -250,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -50,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -250,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -250,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -250,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},



		{
			x: 925,
			y: -50,
			z: 200,
			width: 200,
			color: "#000000"
		},

		{
			x: 925,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -50,
			z: 600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -50,
			z: 800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -250,
			z: 1200,
			width: 200,
			color: "#d96417"
		},

		{
			x: 325,
			y: -250,
			z: 1000,
			width: 200,
			color: "#d96417"
		},

		{
			x: 325,
			y: -450,
			z: 1000,
			width: 200,
			color: "#d96417"
		},

		{
			x: 525,
			y: -450,
			z: 1000,
			width: 200,
			color: "#d96417"
		},

		{
			x: 125,
			y: -450,
			z: 1000,
			width: 200,
			color: "#000000"
		},

		{
			x: -75,
			y: -450,
			z: 1000,
			width: 200,
			color: "#ffffff"
		},

		{
			x: 925,
			y: -450,
			z: 1000,
			width: 200,
			color: "#ffffff"
		},

		{
			x: 725,
			y: -450,
			z: 1000,
			width: 200,
			color: "#000000"
		},

		{
			x: 725,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 925,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 525,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 325,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 125,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: -75,
			y: -650,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: -75,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 125,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 325,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 525,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 725,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 925,
			y: -850,
			z: 1000,
			width: 200,
			color: "#878787"
		},

		{
			x: 925,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 525,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 325,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 125,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -1050,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 125,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 325,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 525,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -1050,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -850,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -650,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -450,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: 350,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: 350,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: 350,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: 150,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: 150,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: 150,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: -50,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 725,
			y: -50,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -50,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -250,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: 925,
			y: -250,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -250,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -250,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -50,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -50,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: 150,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: 150,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: 350,
			z: 1000,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: 350,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -450,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -650,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -850,
			z: 1200,
			width: 200,
			color: "#e0901f"
		},

		{
			x: -75,
			y: -1250,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: -75,
			y: -1450,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 125,
			y: -1450,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		//{x:325,y:-1450,z:1600,width:200,color:"#d48311"},

		//{x:325,y:-1250,z:1600,width:200,color:"#d48311"},

		{
			x: 725,
			y: -1250,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 725,
			y: -1450,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 925,
			y: -1450,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 925,
			y: -1250,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 125,
			y: -1250,
			z: 1600,
			width: 200,
			color: "#d48311"
		},

		{
			x: 125,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 725,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 725,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1200,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},
		{
			x: 125,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 725,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 725,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -50,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1600,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1200,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1400,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 1800,
			width: 200,
			color: "#ce6a27"
		},

		//{x:1125,y:-50,z:2000,width:200,color:"#ce6a27"},

		{
			x: 925,
			y: -250,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -450,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -650,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -850,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 925,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 725,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 525,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 325,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: 125,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -1050,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -850,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -650,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -450,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -250,
			
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: -50,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},

		{
			x: -75,
			y: 150,
			z: 2000,
			width: 200,
			color: "#ce6a27"
		},
	]

	var dogBody = [{
			x: -75,
			y: -850,
			z: 4400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -850,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -850,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -850,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -250,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -50,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -250,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -250,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},
		{
			x: 125,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 2000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 2800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 3000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 3200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 3400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 3600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -50,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -450,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -650,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -850,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -650,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -450,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -250,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -50,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: -50,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -50,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -50,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -250,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -850,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 325,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 525,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -1050,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -850,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -650,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -450,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -250,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: -50,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},
		{
			x: 1125,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -850,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -650,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -450,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -250,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: -50,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -275,
			y: 150,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},
		{
			x: 325,
			y: -50,
			z: 2200,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 2400,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 2600,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 2800,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 3000,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 3200,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 3400,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 3600,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 3800,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 4000,
			width: 200,
			color: "#000000"
		},

		{
			x: 125,
			y: -50,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -50,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -50,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -250,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -450,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -650,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -850,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: -75,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 125,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 325,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 525,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 725,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 925,
			y: -1050,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -850,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -650,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -450,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -250,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: 150,
			z: 4000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 2200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 2400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 2600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 2800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 3000,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 3200,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 3400,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 3600,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 3800,
			width: 200,
			color: "#ae5409"
		},

		{
			x: 1125,
			y: -50,
			z: 4000,
			width: 200,
			color: "#ae5409"
		}
	]
	var dogTail = [{
			x: 525,
			y: -450,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -650,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -650,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -450,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -250,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 4400,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 4600,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -450,
			z: 4600,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -450,
			z: 4600,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -250,
			z: 4600,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -250,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -250,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: -50,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: -50,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 325,
			y: 150,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 725,
			y: 150,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: 150,
			z: 4800,
			width: 200,
			color: "#000000"
		},


		{
			x: 325,
			y: 150,
			z: 5000,
			width: 200,
			color: "#000000"
		},


		{
			x: 125,
			y: 150,
			z: 4800,
			width: 200,
			color: "#000000"
		},

		{
			x: 525,
			y: 150,
			z: 5000,
			width: 200,
			color: "#000000"
		},
	]
	var dogFR = [{
			x: 1125,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 925,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 725,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 350,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 550,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 750,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 950,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 1150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 350,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 550,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 750,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 950,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 1125,
			y: 1150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},
		{
			x: 1125,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 925,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 725,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 1125,
			y: 1350,
			z: 2400,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 1125,
			y: 1350,
			z: 2600,
			width: 200,
			color: "#e8d9b0"
		},
	]
	var dogFL = [{
			x: -275,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 350,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 2400,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 350,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 2600,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 350,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 550,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 750,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 950,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 1150,
			z: 2200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -275,
			y: 1350,
			z: 2200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -275,
			y: 1350,
			z: 2400,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -275,
			y: 1350,
			z: 2600,
			width: 200,
			color: "#e8d9b0"
		},
	]
	var dogBR = [
		{x:925,y:350,z:4200,width:200,color:"#de7f3f"},
		
		{x:925,y:550,z:4200,width:200,color:"#de7f3f"},
		
		{x:925,y:750,z:4200,width:200,color:"#de7f3f"},
		
		{x:925,y:950,z:4200,width:200,color:"#de7f3f"},
		
		{x:925,y:1150,z:4200,width:200,color:"#de7f3f"},
		
		{x:725,y:350,z:4200,width:200,color:"#de7f3f"},
		
		{x:725,y:550,z:4200,width:200,color:"#de7f3f"},
		
		{x:725,y:750,z:4200,width:200,color:"#de7f3f"},
		
		{x:725,y:950,z:4200,width:200,color:"#de7f3f"},
		
		{x:725,y:1150,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:350,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:550,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:750,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:950,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:1150,z:4200,width:200,color:"#de7f3f"},
		
		{x:1125,y:350,z:4000,width:200,color:"#de7f3f"},
		
		{x:1125,y:550,z:4000,width:200,color:"#de7f3f"},
		
		{x:1125,y:750,z:4000,width:200,color:"#de7f3f"},
		
		{x:1125,y:950,z:4000,width:200,color:"#de7f3f"},
		
		{x:1125,y:1150,z:4000,width:200,color:"#de7f3f"},
		
		{x:1125,y:350,z:3800,width:200,color:"#de7f3f"},
		
		{x:1125,y:550,z:3800,width:200,color:"#de7f3f"},
		
		{x:1125,y:750,z:3800,width:200,color:"#de7f3f"},
		
		{x:1125,y:950,z:3800,width:200,color:"#de7f3f"},
		
		{x:1125,y:1150,z:3800,width:200,color:"#de7f3f"},
		
		{x:1125,y:1350,z:3800,width:200,color:"#e8d9b0"},
		
		{x:1125,y:1350,z:4000,width:200,color:"#e8d9b0"},
		
		{x:1125,y:1350,z:4200,width:200,color:"#e8d9b0"},
		
		{x:925,y:1350,z:4200,width:200,color:"#e8d9b0"},
		
		{x:725,y:1350,z:4200,width:200,color:"#e8d9b0"},
	]
	var dogBL = [{
			x: -75,
			y: 350,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 550,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 750,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 950,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -75,
			y: 1150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 350,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 350,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 550,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 750,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 950,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: 125,
			y: 1150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},
		{
			x: -275,
			y: 350,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 4200,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 350,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 4000,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 350,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 550,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 750,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 950,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1150,
			z: 3800,
			width: 200,
			color: "#de7f3f"
		},

		{
			x: -275,
			y: 1350,
			z: 3800,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -275,
			y: 1350,
			z: 4000,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -275,
			y: 1350,
			z: 4200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: -75,
			y: 1350,
			z: 4200,
			width: 200,
			color: "#e8d9b0"
		},

		{
			x: 125,
			y: 1350,
			z: 4200,
			width: 200,
			color: "#e8d9b0"
		},
	]

	function generateEntityFromBlockData(data) {
		var tran = new Entity();
		for (let i = 0; i < data.length; ++i) {

			data[i].colors = [data[i].color, data[i].color, data[i].color, data[i].color, data[i].color, data[i].color]
			//console.log(data[i]);
			tran.addComponent(responseSpaceBlock(data[i]));
		}
		return tran;
	}
	drawer.addEntity(generateEntityFromBlockData(dogHead))
	drawer.addEntity(generateEntityFromBlockData(dogBody))
	drawer.addEntity(generateEntityFromBlockData(dogTail))
	drawer.addEntity(generateEntityFromBlockData(dogFL))
	drawer.addEntity(generateEntityFromBlockData(dogFR))
	drawer.addEntity(generateEntityFromBlockData(dogBL))
	drawer.addEntity(generateEntityFromBlockData(dogBR))

	//设置ui
	var sidebar = document.getElementById('sidebar');
	var xSetter = createUi(sidebar, {
		id: 'x',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[0] = value
		}
	});
	var ySetter = createUi(sidebar, {
		id: 'y',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[1] = value
		}
	});
	var zSetter = createUi(sidebar, {
		id: 'z',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[2] = value
		}
	});
	var xScalerSetter = createUi(sidebar, {
		id: 'scalerX',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[0] = (value - 0.9) / 100
		}
	});
	var yScalerSetter = createUi(sidebar, {
		id: 'scalerY',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[1] = (value - 0.9) / 100
		}
	});
	var zScalerSetter = createUi(sidebar, {
		id: 'scalerZ',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[2] = (value - 0.9) / 100
		}
	});
	var xRotationSetter = createUi(sidebar, {
		id: 'xRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[0] = angle2Radians(value)
		}
	});
	var yRotationSetter = createUi(sidebar, {
		id: 'yRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[1] = angle2Radians(value)
		}
	});
	var zRotationSetter = createUi(sidebar, {
		id: 'zRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[2] = angle2Radians(value)
		}
	});

	//使用右侧菜单的值初始化世界坐标系
	drawer.translation = [xSetter.value, ySetter.value, zSetter.value];
	drawer.rotation = [angle2Radians(xRotationSetter.value), angle2Radians(yRotationSetter.value), angle2Radians(
		zRotationSetter.value)];
	drawer.scale = [(xScalerSetter.value - 0.9) / 100, (yScalerSetter.value - 0.9) / 100, (zScalerSetter.value - 0.9) /
		100
	];

	//绑定虚拟跟踪球,

	function mousemove(vector, theta) {

		drawer.preTransformMatrix = glMatrix._rotateAnyVectorWithFixedPoint(-vector[0], vector[1], vector[2], theta, 0,
			0, 0);
		//console.log(drawer.preTransformMatrix);
	}

	function mouseup(vector, theta) {
		//此处调换顺序是为了使转置操作正确，不过为什么需要转置还没搞清楚
		drawer.transformMatrix = glMatrix.multiply(drawer.preTransformMatrix, drawer.transformMatrix);
		drawer.preTransformMatrix = glMatrix._one();
	}
	var controlBallContainer = document.getElementById('toolBar');
	var controlBall = {
		x: 0,
		y: 0,
		container: controlBallContainer,
		mouseup: mouseup,
		mousemove: mousemove
	};
	bindBallTrackerUi(controlBall);


	var pressed = false;
	var head = arrow.compoments.get(1).points;
	var headR = glMatrix.multiply(glMatrix.T([head[6], head[7], head[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), drawer
		.matrix);

	var p = arrow.compoments.get(0).points;
	var tran = glMatrix.T([p[6], p[7], p[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	var newp = glMatrix.multiply(tran, glMatrix.T(arrow.matrix));
	var curpoints = []
	var curPointNum = 0;

	function curPos2Str() {
		var str = ''
		console.log(curpoints);
		for (let i = 0; i < curpoints.length - 1; ++i) {
			str += curpoints[i] + ',';
			if (i % 3 == 2) {
				str += '\n';
			}
		}
		str += curpoints[curpoints.length - 1];
		return str;
	}
	var step = 200;
	//绑定不能放里面，否则多次绑定
	window.addEventListener('keydown', (event) => {
		if (true) {
			//console.log(headR[0],headR[1*4+0],headR[2*4+0]);
			var newpoint = [newp[0], newp[4], newp[8]];
			newpoint = pointerChanger(100, curpoints, newpoint);
			document.getElementById('getPosition').innerHTML = newpoint[0] + ',' + newpoint[1] + ',' + newpoint[
				2]
			if (event.keyCode == 65) { //A,左
				arrow.translation[0] -= step;
			};

			if (event.keyCode == 68) { //D右
				arrow.translation[0] += step;
			}

			if (event.keyCode == 87) { //W上
				arrow.translation[1] -= step;
			}

			if (event.keyCode == 83) { //S下
				arrow.translation[1] += step;
			}

			if (event.keyCode == 38) { //up前
				arrow.translation[2] += step;
			}

			if (event.keyCode == 40) { //down后
				arrow.translation[2] -= step;
			}
			if (event.keyCode == 81) { //Q绕y轴旋转
				arrow.rotation[1] += 0.1;
			}
			if (event.keyCode == 69) { //E后
				arrow.rotation[1] -= 0.1;
			}
			if (event.keyCode == 32) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter
					var p = document.createElement('p');
					var color = document.getElementById('colorPicker').value;
					p.innerText = responseSpaceP({
						x: newpoint[0],
						y: newpoint[1],
						z: newpoint[2],
						width: step,
						color: color
					})
					document.getElementById('sidebar1').appendChild(p);
					//console.log(curpoints)
					drawer.addEntity(responseSpaceBlock({
						x: newpoint[0],
						y: newpoint[1],
						z: newpoint[2],
						width: step,
						colors: [color, color, color, color, color, color]
					}));
				}
			}
			if (event.keyCode == 100) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter

					//console.log(curpoints)
					for (let i = 0; i < 10; ++i) {
						var p = document.createElement('p');
						var color = document.getElementById('colorPicker').value;
						p.innerText = responseSpaceP({
							x: newpoint[0],
							y: newpoint[1],
							z: newpoint[2] + i * step,
							width: step,
							color: color
						})
						document.getElementById('sidebar1').appendChild(p);
						drawer.addEntity(responseSpaceBlock({
							x: newpoint[0],
							y: newpoint[1],
							z: newpoint[2] + i * step,
							width: step,
							colors: [color, color, color, color, color, color]
						}));
					}
				}
			}
			if (event.keyCode == 101) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter

					//console.log(curpoints)
					for (let i = 0; i < 5; ++i) {
						var p = document.createElement('p');
						var color = document.getElementById('colorPicker').value;
						p.innerText = responseSpaceP({
							x: newpoint[0],
							y: newpoint[1] + i * step,
							z: newpoint[2],
							width: step,
							color: color
						})
						document.getElementById('sidebar1').appendChild(p);
						drawer.addEntity(responseSpaceBlock({
							x: newpoint[0],
							y: newpoint[1] + i * step,
							z: newpoint[2],
							width: step,
							colors: [color, color, color, color, color, color]
						}));
					}
				}
			}

			if (event.keyCode == 97) { //1,世界坐标系旋转y轴
				drawer.rotation[1] += 0.5;
			}
			if (event.keyCode == 99) { //3,世界坐标系旋转y轴
				drawer.rotation[1] -= 0.5;
			}
			newp = glMatrix.multiply(tran, glMatrix.T(arrow.matrix));

		}
	})

	function test() {
		setInterval(() => {

			drawer.setData();
			drawer.render();
			//head=arrow.compoments.get(1).points;
			headR = glMatrix.multiply(glMatrix.T([head[6], head[7], head[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0
			]), drawer.matrix);
			if (pressed) {
				//console.log(arrow)
			}
		}, 5)
	}
	test()

}

/*
思路:
初始化阶段:Canvas类根据每一个shape中的值setGeometry,setColors,将所有的数据整合一次性传给
内存。然后,为每一个shape分配一个offset和stride
在渲染时,逐层获得转置矩阵做乘积,由shape传给着色器程序

*/
