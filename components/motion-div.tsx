'use client'
import { type AnimationProps, motion } from 'motion/react'
import type React from 'react'

// 因为motion是一个client的库，那么在page.tsx中直接用会有问题
export const MotionDiv = (props: AnimationProps & { children?: React.ReactNode }) => {
	return <motion.div {...props} />
}
