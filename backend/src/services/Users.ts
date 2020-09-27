import { getRandom } from '@utils';
import { Request, Response } from 'express';
import { Error } from 'mongoose';
import User, { UserInterface } from '../models/User';
// import { getRandom } from '../utils';

export const getUsers = (_req: Request, res: Response): void => {
  User.find((err: Error, users: Array<UserInterface>) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(users);
    }
  });
};

export const getUser = (req: Request, res: Response): void => {
  User.findById(req.params.id, (err: Error, user: UserInterface) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(user);
    }
  });
};

export const addUser = (req: Request, res: Response): void => {
  const user = new User(req.body);
  user.save((err: Error) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(user);
    }
  });
};

// export const addMockUsers = (req: Request, _res: Response): void => {
//   for (let key in req.body) {
//     if (req.body.hasOwnProperty(key)) {
//       const user = req.body[key];
//       new User(user).save();
//     }
//   }
// };

export const updateUser = (req: Request, res: Response): void => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: Error, user: UserInterface) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(user);
      }
    },
  );
};

export const deleteUser = (req: Request, res: Response): void => {
  User.deleteOne({ _id: req.params.id }, (err: Error) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('User deleted from database');
    }
  });
};

export const generateTeam = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, skill, role } = req.body;
  const forward: UserInterface[] = [],
    midfield: UserInterface[] = [],
    defence: UserInterface[] = [],
    goalkeeper: UserInterface[] = [];

  try {
    const availableForward = await User.find({
      name: new RegExp(`^((?!${name}).)*$`),
      role: /forward/,
      skill: new RegExp(skill),
    });
    const availableMidfield = await User.find({
      name: new RegExp(`^((?!${name}).)*$`),
      role: /midfield/,
      skill: new RegExp(skill),
    });
    const availableDefence = await User.find({
      name: new RegExp(`^((?!${name}).)*$`),
      role: /defence/,
      skill: new RegExp(skill),
    });
    const availableGoalkeepers = await User.find({
      name: new RegExp(`^((?!${name}).)*$`),
      role: /goalkeeper/,
      skill: new RegExp(skill),
    });

    //GET 3 FORWARD, 3 MIDFIELD, 4 DEFENCE, 1 GOALKEEPER (can be changed to dynamic in the future)

    switch (role) {
      case 'forward': {
        forward.push(req.body);
        forward.push(...getRandom(availableForward, 2));
        midfield.push(...getRandom(availableMidfield, 3));
        defence.push(...getRandom(availableDefence, 4));
        goalkeeper.push(...getRandom(availableGoalkeepers, 1));
        break;
      }
      case 'midfield': {
        midfield.push(req.body);
        forward.push(...getRandom(availableForward, 3));
        midfield.push(...getRandom(availableMidfield, 2));
        defence.push(...getRandom(availableDefence, 4));
        goalkeeper.push(...getRandom(availableGoalkeepers, 1));
        break;
      }
      case 'defence': {
        defence.push(req.body);
        forward.push(...getRandom(availableForward, 3));
        midfield.push(...getRandom(availableMidfield, 3));
        defence.push(...getRandom(availableDefence, 3));
        goalkeeper.push(...getRandom(availableGoalkeepers, 1));
        break;
      }
      case 'goalkeeper': {
        goalkeeper.push(req.body);
        forward.push(...getRandom(availableForward, 3));
        midfield.push(...getRandom(availableMidfield, 3));
        defence.push(...getRandom(availableDefence, 4));
        break;
      }
      default: {
        throw new Error(`Role ${role} is not defined.`);
      }
    }
  } catch (err) {
    res.status(400).send(
      `Something went wrong generating team for user: ${JSON.stringify(
        req.body,
      )}
        ${err}`,
    );
  }

  const team: any = {
    forward,
    midfield,
    defence,
    goalkeeper,
  };

  res.status(200).send(team);
};
