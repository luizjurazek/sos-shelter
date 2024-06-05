import BlacklistToken from "../models/blacklistTokenModel";

const BlacklistTokenModel = BlacklistToken;

class BlacklistTokenController {
  // Insert a token on black list
  async insertToken(token: string) {
    const tokenInserted = await BlacklistTokenModel.create({
      token,
    });

    // if the token isn't inserted return false else return true
    if (!tokenInserted) {
      return false;
    } else {
      return true;
    }
  }

  // Remove a token from black list
  async removeToken(token: string) {
    const tokenRemoved = await BlacklistTokenModel.destroy({
      where: {
        token,
      },
    });

    // if the token isn't removed return false else return true
    if (!tokenRemoved) {
      return false;
    } else {
      return true;
    }
  }

  async verifyTokenOnBlackList(token: string) {
    const verifiedToken = await BlacklistTokenModel.findOne({
      where: {
        token,
      },
    });

    // if the token isn't on table return false else return true
    if (!verifiedToken) {
      return false;
    } else {
      return true;
    }
  }
}

export default BlacklistTokenController;
