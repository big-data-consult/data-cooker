const { Plugin } = require('../../models');


const PluginController = () => {
	const getPlugins = async (req, res) => {
		const plugins = await Plugin.findAll({
			attributes: ['id', 'pluginName'],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', plugins.length)
			.json({ plugins });
	};


	const getPlugin = async (req, res) => {
		const plugin = await Plugin.findByPk(req.params.id, {
			attributes: ['id', 'pluginName'],
		});

		if (plugin) {
			res.json({ plugin });
		} else {
			res.status(404).json({ message: 'Plugin id not found.' });
		}
	};

	return {
		getPlugins,
		getPlugin,
	};
};

module.exports = PluginController;

