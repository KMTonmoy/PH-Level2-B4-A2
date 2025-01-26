import jwt from 'jsonwebtoken';
import UserModel from './user.model';

async function createUser(data: { name: string; email: string; password: string }) {
    try {
        const { name, email, password } = data;
        const user = await UserModel.create({ name, email, password, role: 'admin' });
        return user;
    } catch (error) {
        throw error;
    }
}




async function getAllUsers() {
    try {
        const users = await UserModel.find();
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
}


async function verifyPassword(userId: string, password: string) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.isPasswordMatch(password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

async function loginUser(email: string, password: string) {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        return {
            success: true,
            message: 'Login successful',
            statusCode: 200,
            data: { token },
        };
    } catch (err) {
        throw new Error('Invalid credentials');
    }
}

async function blockUser(userId: string, adminToken: string) {
    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'your_jwt_secret') as { role: string };
        if (decoded.role !== 'admin') {
            throw new Error('Access denied, admin only');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.isBlocked = true;

        const savedUser = await user.save();

        return {
            success: true,
            message: 'User blocked successfully',
            statusCode: 200,
        };
    } catch (error) {
        throw new Error('Error blocking user');
    }
}
async function unblockUser(userId: string, adminToken: string) {
    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'your_jwt_secret') as { role: string };
        if (decoded.role !== 'admin') {
            throw new Error('Access denied, admin only');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user is already unblocked
        if (!user.isBlocked) {
            throw new Error('User is already unblocked');
        }

        // Unblock the user
        user.isBlocked = false;

        const savedUser = await user.save();

        return {
            success: true,
            message: 'User unblocked successfully',
            statusCode: 200,
        };
    } catch (error) {
        // Return specific error message based on the error thrown
        return {
            success: false,
            message: error.message || 'Error unblocking user',
            statusCode: 400,
        };
    }
}


export const userControllers = {
    createUser,
    verifyPassword,
    loginUser,
    blockUser,
    getAllUsers,
    unblockUser
};
