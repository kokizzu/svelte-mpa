// can be hit using with /api/[ApiName]
export const LastUpdatedAt = 1629602539
export const APIs = {
	ElementList: {
		in: {
		}, out: {
			elements: {key:'value'}, 
		},
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
		},
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
		},
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
		},
	},
	ExchangePackageCallback: {
		in: {
		}, out: {
		},
	},
	ExchangePackageList: {
		in: {
		}, out: {
		},
	},
	ExchangePackagePurchase: {
		in: {
		}, out: {
		},
	},
	ExchangePackageUpsert: {
		in: {
		}, out: {
		},
	},
	LeaderboardDaily: {
		in: {
		}, out: {
		},
	},
	LeaderboardMonthly: {
		in: {
		}, out: {
		},
	},
	LeaderboardWeekly: {
		in: {
		}, out: {
		},
	},
	MatchBet: {
		in: {
			betAmount: '', // int64
			recentSecond: '', // int64
			sessionToken: '', //string | player login token
		}, out: {
			trxId: '', // uint64
			matchId: '', // uint64
		},
	},
	MatchCancel: {
		in: {
			trxId: '', // uint64
			sessionToken: '', //string | player login token
		}, out: {
		},
	},
	MatchChooseHand: {
		in: {
			matchId: '', // uint64
			battleNumber: '', // int
			handSign: '', // string
			sessionToken: '', //string | player login token
		}, out: {
			matchId: '', // uint64
			myHand: '', // string
			theirHand: '', // string
			history: '', // string
			winLose: '', // string
			lastBattleAt: '', // int64
			winner: '', // uint64
			loser: '', // uint64
		},
	},
	MatchDetail: {
		in: {
		}, out: {
		},
	},
	MatchHistory: {
		in: {
			sessionToken: '', //string | player login token
		}, out: {
		},
	},
	MatchList: {
		in: {
		}, out: {
		},
	},
	PackList: {
		in: {
		}, out: {
			packs: {key:'value'}, 
		},
	},
	PlayerChangeEmail: {
		in: {
		}, out: {
		},
	},
	PlayerChangePassword: {
		in: {
		}, out: {
		},
	},
	PlayerConfirmEmail: {
		in: {
		}, out: {
		},
	},
	PlayerForgotPassword: {
		in: {
		}, out: {
		},
	},
	PlayerList: {
		in: {
			limit: '', // uint32
			offset: '', // uint32
		}, out: {
			limit: '', // uint32
			offset: '', // uint32
			total: '', // uint32
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
		},
	},
	PlayerLogin: {
		in: {
			email: '', // string
			password: '', // string
		}, out: {
			walletId: '', // string
			sessionToken: '', //string | login token
		},
	},
	PlayerLogout: {
		in: {
		}, out: {
			loggedOut: '', // bool
			sessionToken: '', //string | login token
		},
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
		},
	},
	PlayerRegister: {
		in: {
			fullName: '', // string
			email: '', // string
			password: '', // string
		}, out: {
		},
	},
	PlayerResetPassword: {
		in: {
			password: '', // string
			newPass: '', // string
		}, out: {
		},
	},
	PlayerSelectSkin: {
		in: {
			skinId: '', // uint64
			sessionToken: '', //string | player login token
		}, out: {
			ok: '', // bool
		},
	},
	RarityList: {
		in: {
		}, out: {
			rarities: {key:'value'}, 
		},
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
		},
	},
	SkinList: {
		in: {
			limit: '', // uint32
			offset: '', // uint32
		}, out: {
			total: '', // uint32
			limit: '', // uint32
			offset: '', // uint32
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
		},
	},
	SkinListOwned: {
		in: {
			sessionToken: '', //string | player login token
		}, out: {
			skinsIds: [], 
		},
	},
	SkinPurchase: {
		in: {
			skinId: '', // uint64
			sessionToken: '', //string | player login token
		}, out: {
			purchasedAt: '', // int64
		},
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
		},
	},
	SkinUpsert: {
		in: {
			skinId: '', // uint64
			name: '', // string
			descrHtml: '', // string
			price: '', // uint64
			quota: '', // uint64
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
		},
	},
}