const { Op } = require("sequelize");
const { User } = require('../models');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Avatar = require('../models').Avatar;
const Role = require('../models').Role;
// const User = require('../models').User;

const AuthController = () => {
	const register = async (req, res) => {
		const {
			userName,
			firstName,
			lastName,
			email,
			password,
			password2,
			avatartId,
			roleId,
			permissionId,
		} = req.body;

		if (password === password2) {
			try {
				const user = await User.create({
					userName,
					firstName,
					lastName,
					email,
					password,
					avatartId,
					roleId,
					permissionId,
				});
				const token = authService().issue({ id: user.id });

				return res.status(200).json({ token, user });
			} catch (err) {
				console.log(err);
				return res.status(500).json({ msg: 'Internal server error' });
			}
		}

		return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
	};

	const login = async (req, res) => {
		const { username, password } = req.body;

		if (username && password) {
			try {
				const user = await User.findOne({
					include: [
						{
							model: Role,
							as: "role",
							attributes: ["id", "roleName"]
						},
						{
							model: Avatar,
							as: "avatar",
							attributes: ["id", "avatarData"]
						}
					],
					where: {
						[Op.or]: [
							{ userName: username },
							{ email: username }
						]
					},
				});

				if (!user) {
					return res.status(400).json({ msg: 'Bad Request: User not found' });
				}

				if (bcryptService().comparePassword(password, user.password)) {
					const token = authService().issue({ id: user.id });

					return res.status(200).json({ token, user });
				}

				return res.status(401).json({ msg: 'Unauthorized' });
			} catch (err) {
				console.log(err);
				return res.status(500).json({ msg: 'Internal server error' });
			}
		}

		return res.status(400).json({ msg: 'Bad Request: Username/Email or password don\'t match' });
	};

	const validate = (req, res) => {
		const { token } = req.body;

		authService().verify(token, (err) => {
			if (err) {
				return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
			}

			return res.status(200).json({ isvalid: true });
		});
	};

	return {
		register,
		login,
		validate,
	};
};

module.exports = AuthController;
