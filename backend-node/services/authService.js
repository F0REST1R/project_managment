const pool =
	require('../config/db')

const bcrypt =
	require('bcryptjs')

class AuthService {
	async register(user) {
		const hash =
			await bcrypt.hash(
				user.password,
				10
			)
		await pool.query(
			`
			INSERT INTO users
			(first_name,last_name,email,password,role)
			VALUES($1,$2,$3,$4,$5)
			`,
			[
				user.first_name,
				user.last_name,
				user.email,
				hash,
				user.role
			]
		)
	}
	async login(email,password) {

		const result =
			await pool.query(

				`
				SELECT *
				FROM users
				WHERE email=$1
				`,

				[email]

			)

		if(result.rows.length === 0) {

			throw new Error(
				'User not found'
			)

		}

		const user =
			result.rows[0]

		const valid =
			await bcrypt.compare(

				password,
				user.password

			)

		if(!valid) {

			throw new Error(
				'Wrong password'
			)

		}

		return user

	}

	async getUserById(id) {

		const result =
			await pool.query(

				`
				SELECT
				id,
				first_name,
				last_name,
				email,
				role
				FROM users
				WHERE id=$1
				`,

				[id]

			)

		return result.rows[0]

	}

}

module.exports =
	new AuthService()