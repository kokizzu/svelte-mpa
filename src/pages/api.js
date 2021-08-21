// can be hit using with /api/[ApiName]
export const APIs = {
	ElementList: {
		in: {
		}, out: {
			elements: '', 
		},
	},
	EventGet: {
		in: {
			eventId: '', // uint64
		}, out: {
			event: {
				id: '' , // uint64
				name: '' , // string
				descrHtml: '' , // string
				startedAt: '' , // int64
				endedAt: '' , // int64
				repeatEvery: '' , // int64
				bannerImgUrl: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				repeatDuration: '' , // int64
			},
		},
	},
	EventList: {
		in: {
			limit: '', // uint32
			offset: '', // uint32
		}, out: {
			total: '', // uint32
			limit: '', // uint32
			offset: '', // uint32
			events: [{
				id: '' , // uint64
				name: '' , // string
				descrHtml: '' , // string
				startedAt: '' , // int64
				endedAt: '' , // int64
				repeatEvery: '' , // int64
				bannerImgUrl: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				repeatDuration: '' , // int64
			}],
		},
	},
	EventUpsert: {
		in: {
			eventId: '', // uint64
			name: '', // string
			descrHtml: '', // string
			startedAt: '', // int64
			endedAt: '', // int64
			repeatEvery: '', // int64
			repeatDuration: '', // int64
			bannerImgUrl: '', // string
			sessionToken: '', //string | admin login token
		}, out: {
			event: {
				id: '' , // uint64
				name: '' , // string
				descrHtml: '' , // string
				startedAt: '' , // int64
				endedAt: '' , // int64
				repeatEvery: '' , // int64
				bannerImgUrl: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				repeatDuration: '' , // int64
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
	MatchBothHandChosen: {
		in: {
		}, out: {
		},
	},
	MatchCancel: {
		in: {
		}, out: {
		},
	},
	MatchChallengeAgain: {
		in: {
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
			packs: '', 
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
				id: '' , // uint64
				email: '' , // string
				password: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				passwordSetAt: '' , // int64
				secretCode: '' , // string
				secretCodeAt: '' , // int64
				verificationSentAt: '' , // int64
				verifiedAt: '' , // int64
				lastLoginAt: '' , // int64
				walletId: '' , // string
				fundTotal: '' , // int64
				fundCheckedAt: '' , // int64
				skinCurrent: '' , // uint64
				energyTotal: '' , // int64
				energyUsed: '' , // int64
				energyRechargeAt: '' , // int64
				experience: '' , // int64
				battlePoint: '' , // int64
				fullName: '' , // string
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
				id: '' , // uint64
				email: '' , // string
				password: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				passwordSetAt: '' , // int64
				secretCode: '' , // string
				secretCodeAt: '' , // int64
				verificationSentAt: '' , // int64
				verifiedAt: '' , // int64
				lastLoginAt: '' , // int64
				walletId: '' , // string
				fundTotal: '' , // int64
				fundCheckedAt: '' , // int64
				skinCurrent: '' , // uint64
				energyTotal: '' , // int64
				energyUsed: '' , // int64
				energyRechargeAt: '' , // int64
				experience: '' , // int64
				battlePoint: '' , // int64
				fullName: '' , // string
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
			rarities: '', 
		},
	},
	SkinGet: {
		in: {
			skinId: '', // uint64
		}, out: {
			skin: {
				id: '' , // uint64
				name: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				category: '' , // uint64
				templateAt: '' , // int64
				syncAt: '' , // int64
				offerAt: '' , // int64
				quota: '' , // uint64
				price: '' , // uint64
				stock: '' , // uint64
				stardustId: '' , // string
				descrHtml: '' , // string
				videoUrl: '' , // string
				rockImgUrl: '' , // string
				paperImgUrl: '' , // string
				scissorImgUrl: '' , // string
				series: '' , // string
				rarity: '' , // string
				element: '' , // string
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
				id: '' , // uint64
				name: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				category: '' , // uint64
				templateAt: '' , // int64
				syncAt: '' , // int64
				offerAt: '' , // int64
				quota: '' , // uint64
				price: '' , // uint64
				stock: '' , // uint64
				stardustId: '' , // string
				descrHtml: '' , // string
				videoUrl: '' , // string
				rockImgUrl: '' , // string
				paperImgUrl: '' , // string
				scissorImgUrl: '' , // string
				series: '' , // string
				rarity: '' , // string
				element: '' , // string
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
			sessionToken: '', //string | admin login token
		}, out: {
			skin: {
				id: '' , // uint64
				name: '' , // string
				createdAt: '' , // int64
				createdBy: '' , // uint64
				updatedAt: '' , // int64
				updatedBy: '' , // uint64
				deletedAt: '' , // int64
				deletedBy: '' , // uint64
				isDeleted: '' , // bool
				restoredAt: '' , // int64
				restoredBy: '' , // uint64
				category: '' , // uint64
				templateAt: '' , // int64
				syncAt: '' , // int64
				offerAt: '' , // int64
				quota: '' , // uint64
				price: '' , // uint64
				stock: '' , // uint64
				stardustId: '' , // string
				descrHtml: '' , // string
				videoUrl: '' , // string
				rockImgUrl: '' , // string
				paperImgUrl: '' , // string
				scissorImgUrl: '' , // string
				series: '' , // string
				rarity: '' , // string
				element: '' , // string
			},
		},
	},
}
