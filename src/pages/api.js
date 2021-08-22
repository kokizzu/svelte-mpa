// can be hit using with /api/[ApiName]
export const LastUpdatedAt = 1629611026
export const APIs = {
	ElementList: {
		in: {
		}, out: {
			elements: {key:'value'}, 
		}, err: []
	},
	EventGet: {
		in: {
			eventId: '', // uint64
		}, out: {
			event: {
				id:  0, // uint64
				name:  '', // string
				descrHtml:  '', // string
				startedAt:  0, // int64
				endedAt:  0, // int64
				repeatEvery:  0, // int64
				bannerImgUrl:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqGame.Events
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				repeatDuration:  0, // int64
			},
		}, err: [
			[500, `event not found`],
		]
	},
	EventList: {
		in: {
			limit: 0, // uint32
			offset: 0, // uint32
		}, out: {
			total: 0, // uint32
			limit: 0, // uint32
			offset: 0, // uint32
			events: [{
				id:  0, // uint64
				name:  '', // string
				descrHtml:  '', // string
				startedAt:  0, // int64
				endedAt:  0, // int64
				repeatEvery:  0, // int64
				bannerImgUrl:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqGame.Events
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				repeatDuration:  0, // int64
			}],
		}, err: [
		]
	},
	EventUpload: {
		in: {
			uploadId: '', // uint64
			fileBinary: '', // string
			sessionToken: '', //string | admin login token
		}, out: {
			eventUpload: {
				id:  0, // uint64
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqGame.EventUploads
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				sizeByte:  0, // uint64
				filePath:  '', // string
				contentType:  '', // string
				origName:  '', // string
			},
		}, err: [
			[400, `invalid session token`],
			[400, `missing fileBinary, enctype not multipart/form-data?`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `must be admin: `],
			[403, `session expired`],
			[404, `upload not found, wrong env?`],
			[500, `cannot create upload directory`],
			[500, `cannot detect file type: `],
			[500, `cannot upsert event`],
			[500, `failed moving uploaded file`],
			[500, `failed to stat moved file`],
		]
	},
	EventUpsert: {
		in: {
			eventId: '', // uint64
			name: '', // string
			descrHtml: '', // string
			startedAt: 0, // int64
			endedAt: 0, // int64
			repeatEvery: 0, // int64
			repeatDuration: 0, // int64
			bannerImgUrl: '', // string
			doDelete: false, // bool
			doRestore: false, // bool
			sessionToken: '', //string | admin login token
		}, out: {
			event: {
				id:  0, // uint64
				name:  '', // string
				descrHtml:  '', // string
				startedAt:  0, // int64
				endedAt:  0, // int64
				repeatEvery:  0, // int64
				bannerImgUrl:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqGame.Events
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				repeatDuration:  0, // int64
			},
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `must be admin: `],
			[403, `session expired`],
			[404, `event not found, wrong env?`],
			[500, `cannot upsert event`],
		]
	},
	ExchangePackageCallback: {
		in: {
		}, out: {
		}, err: []
	},
	ExchangePackageList: {
		in: {
		}, out: {
		}, err: []
	},
	ExchangePackagePurchase: {
		in: {
		}, out: {
		}, err: []
	},
	ExchangePackageUpsert: {
		in: {
		}, out: {
		}, err: []
	},
	LeaderboardDaily: {
		in: {
		}, out: {
		}, err: []
	},
	LeaderboardMonthly: {
		in: {
		}, out: {
		}, err: []
	},
	LeaderboardWeekly: {
		in: {
		}, out: {
		}, err: []
	},
	MatchBet: {
		in: {
			betAmount: 0, // int64
			recentSecond: 0, // int64
			sessionToken: '', //string | player login token
		}, out: {
			trxId: '', // uint64
			matchId: '', // uint64
		}, err: [
			[400, `insufficient fund to bet`],
			[400, `invalid session token`],
			[400, `player not found on database, wrong env?`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
			[500, `failed deduct bet from player`],
			[500, `failed to create match`],
			[500, `failed to place a bet`],
			[500, `failed to update enemy trx`],
			[500, `failed to update matchmaking time`],
			[500, `failed to update player trx`],
		]
	},
	MatchCancel: {
		in: {
			trxId: '', // uint64
			sessionToken: '', //string | player login token
		}, out: {
		}, err: [
			[400, `invalid session token`],
			[400, `player not found on database, wrong env?`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `cannot cancel match that already started`],
			[403, `cannot cancel unowned match`],
			[403, `session expired`],
			[404, `transaction not found, wrong env?`],
			[500, `failed refund bet to player`],
			[500, `failed to place a bet`],
		]
	},
	MatchChooseHand: {
		in: {
			matchId: '', // uint64
			battleNumber: 0, // int
			handSign: '', // string
			sessionToken: '', //string | player login token
		}, out: {
			matchId: '', // uint64
			myHand: '', // string
			theirHand: '', // string
			history: '', // string
			winLose: '', // string
			lastBattleAt: 0, // int64
			winner: 0, // uint64
			loser: 0, // uint64
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
			[403, `you are not the member of this match`],
			[500, `failed update match`],
			[500, `match missing from database, wrong env?`],
		]
	},
	MatchDetail: {
		in: {
		}, out: {
		}, err: []
	},
	MatchHistory: {
		in: {
			sessionToken: '', //string | player login token
		}, out: {
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
		]
	},
	MatchList: {
		in: {
		}, out: {
		}, err: []
	},
	PackList: {
		in: {
		}, out: {
			packs: {key:'value'}, 
		}, err: []
	},
	PlayerChangeEmail: {
		in: {
		}, out: {
		}, err: []
	},
	PlayerChangePassword: {
		in: {
		}, out: {
		}, err: []
	},
	PlayerConfirmEmail: {
		in: {
		}, out: {
		}, err: []
	},
	PlayerForgotPassword: {
		in: {
		}, out: {
		}, err: []
	},
	PlayerList: {
		in: {
			limit: 0, // uint32
			offset: 0, // uint32
		}, out: {
			limit: 0, // uint32
			offset: 0, // uint32
			total: 0, // uint32
			players: [{
				id:  0, // uint64
				email:  '', // string
				password:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqAuth.Players
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				passwordSetAt:  0, // int64
				secretCode:  '', // string
				secretCodeAt:  0, // int64
				verificationSentAt:  0, // int64
				verifiedAt:  0, // int64
				lastLoginAt:  0, // int64
				walletId:  '', // string
				fundTotal:  0, // int64
				fundCheckedAt:  0, // int64
				skinCurrent:  0, // uint64
				energyTotal:  0, // int64
				energyUsed:  0, // int64
				energyRechargeAt:  0, // int64
				experience:  0, // int64
				battlePoint:  0, // int64
				fullName:  '', // string
			}],
		}, err: [
		]
	},
	PlayerLogin: {
		in: {
			email: '', // string
			password: '', // string
		}, out: {
			walletId: '', // string
			sessionToken: '', //string | login token
		}, err: [
			[401, `wrong email or password`],
			[401, `wrong password or email`],
			[500, `cannot create session`],
		]
	},
	PlayerLogout: {
		in: {
		}, out: {
			loggedOut: false, // bool
			sessionToken: '', //string | login token
		}, err: [
		]
	},
	PlayerProfile: {
		in: {
			sessionToken: '', //string | player login token
		}, out: {
			player: {
				id:  0, // uint64
				email:  '', // string
				password:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqAuth.Players
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				passwordSetAt:  0, // int64
				secretCode:  '', // string
				secretCodeAt:  0, // int64
				verificationSentAt:  0, // int64
				verifiedAt:  0, // int64
				lastLoginAt:  0, // int64
				walletId:  '', // string
				fundTotal:  0, // int64
				fundCheckedAt:  0, // int64
				skinCurrent:  0, // uint64
				energyTotal:  0, // int64
				energyUsed:  0, // int64
				energyRechargeAt:  0, // int64
				experience:  0, // int64
				battlePoint:  0, // int64
				fullName:  '', // string
			},
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
			[404, `player does not exists on database: `],
		]
	},
	PlayerRegister: {
		in: {
			fullName: '', // string
			email: '', // string
			password: '', // string
		}, out: {
		}, err: [
			[451, `failed to register this player: `],
			[451, `user already exists: `],
			[500, `cannot generate password: `],
			[504, `failed to update walletId: `],
		]
	},
	PlayerResetPassword: {
		in: {
			password: '', // string
			newPass: '', // string
		}, out: {
		}, err: []
	},
	PlayerSelectSkin: {
		in: {
			skinId: 0, // uint64
			sessionToken: '', //string | player login token
		}, out: {
			ok: false, // bool
		}, err: [
			[400, `invalid session token`],
			[400, `player not found on database, wrong environment?`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[400, `you don't own this skin`],
			[403, `session expired`],
		]
	},
	RarityList: {
		in: {
		}, out: {
			rarities: {key:'value'}, 
		}, err: []
	},
	SkinGet: {
		in: {
			skinId: '', // uint64
		}, out: {
			skin: {
				id:  0, // uint64
				name:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqItem.Skins
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				category:  0, // uint64
				templateAt:  0, // int64
				syncAt:  0, // int64
				offerAt:  0, // int64
				quota:  0, // uint64
				price:  0, // uint64
				stock:  0, // uint64
				stardustId:  '', // string
				descrHtml:  '', // string
				videoUrl:  '', // string
				rockImgUrl:  '', // string
				paperImgUrl:  '', // string
				scissorImgUrl:  '', // string
				series:  '', // string
				rarity:  '', // string
				element:  '', // string
			},
		}, err: [
			[500, `skin not found`],
		]
	},
	SkinList: {
		in: {
			limit: 0, // uint32
			offset: 0, // uint32
		}, out: {
			total: 0, // uint32
			limit: 0, // uint32
			offset: 0, // uint32
			skins: [{
				id:  0, // uint64
				name:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqItem.Skins
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				category:  0, // uint64
				templateAt:  0, // int64
				syncAt:  0, // int64
				offerAt:  0, // int64
				quota:  0, // uint64
				price:  0, // uint64
				stock:  0, // uint64
				stardustId:  '', // string
				descrHtml:  '', // string
				videoUrl:  '', // string
				rockImgUrl:  '', // string
				paperImgUrl:  '', // string
				scissorImgUrl:  '', // string
				series:  '', // string
				rarity:  '', // string
				element:  '', // string
			}],
		}, err: [
		]
	},
	SkinListOwned: {
		in: {
			sessionToken: '', //string | player login token
		}, out: {
			skinsIds: [], 
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
		]
	},
	SkinPurchase: {
		in: {
			skinId: '', // uint64
			sessionToken: '', //string | player login token
		}, out: {
			purchasedAt: 0, // int64
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `session expired`],
		]
	},
	SkinUpload: {
		in: {
			uploadId: '', // uint64
			fileBinary: '', // string
			sessionToken: '', //string | admin login token
		}, out: {
			skinUpload: {
				id:  0, // uint64
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqItem.SkinUploads
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				sizeByte:  0, // uint64
				filePath:  '', // string
				contentType:  '', // string
				origName:  '', // string
			},
		}, err: [
			[400, `invalid session token`],
			[400, `missing fileBinary, enctype not multipart/form-data?`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `must be admin: `],
			[403, `session expired`],
			[404, `upload not found, wrong env?`],
			[500, `cannot create upload directory`],
			[500, `cannot detect file type: `],
			[500, `cannot upsert skin`],
			[500, `failed moving uploaded file`],
			[500, `failed to stat moved file`],
		]
	},
	SkinUpsert: {
		in: {
			skinId: '', // uint64
			name: '', // string
			descrHtml: '', // string
			price: 0, // uint64
			quota: 0, // uint64
			stardustId: '', // string
			videoUrl: '', // string
			rockImgUrl: '', // string
			paperImgUrl: '', // string
			scissorImgUrl: '', // string
			series: '', // string
			rarity: '', // string
			element: '', // string
			doDelete: false, // bool
			doRestore: false, // bool
			sessionToken: '', //string | admin login token
		}, out: {
			skin: {
				id:  0, // uint64
				name:  '', // string
				createdAt:  0, // int64
				createdBy:  '', // uint64
				updatedAt:  0, // int64
				updatedBy:  '', // uint64
				deletedAt:  0, // int64
				deletedBy:  '', // uint64
				isDeleted:  false, // rqItem.Skins
				restoredAt:  0, // int64
				restoredBy:  '', // uint64
				category:  0, // uint64
				templateAt:  0, // int64
				syncAt:  0, // int64
				offerAt:  0, // int64
				quota:  0, // uint64
				price:  0, // uint64
				stock:  0, // uint64
				stardustId:  '', // string
				descrHtml:  '', // string
				videoUrl:  '', // string
				rockImgUrl:  '', // string
				paperImgUrl:  '', // string
				scissorImgUrl:  '', // string
				series:  '', // string
				rarity:  '', // string
				element:  '', // string
			},
		}, err: [
			[400, `invalid session token`],
			[400, `session missing from database, wrong env?`],
			[400, `token expired`],
			[403, `must be admin: `],
			[403, `session expired`],
			[404, `skin not found, wrong env?`],
			[500, `cannot upsert skin`],
		]
	},
}